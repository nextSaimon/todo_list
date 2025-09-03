import { createSessionClient, createAdminClient } from "./lib/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import CryptoJS from "crypto-js";

const errorMessages = {
  userAlreadyExists: "User already exists",
  invalidPassword:
    "Password must be between 8 and 265 characters long, and should not be one of the commonly used passwords.",
  invalidEmail: "Invalid email address",
  loginError: "Invalid email or password",
  allFieldsRequired: "All fields are required",
  default: "Something went wrong",
};

const auth = {
  user: null,
  setJWT: async (swssionValue) => {
    try {
      const { account } = await createSessionClient(swssionValue);
      const jwt = (await account.createJWT()).jwt;
      return jwt;
    } catch (error) {
      console.log("error in setJWT..", error);
      return null;
    }
  },
  getUser: async () => {
    "use server";
    const session = (await cookies()).get("session");
    const jwt = (await cookies()).get("jwt");
    if (!session) return (auth.user = null);
    try {
      const { account } = await createSessionClient(session.value);
      auth.user = await account.get();

      return auth.user;
    } catch (error) {
      return (auth.user = null);
    }
  },

  login: async (uderData) => {
    "use server";
    console.log("uderData ", uderData);

    const session = CryptoJS.AES.encrypt(
      `${uderData.$id};${uderData.userId}`,
      `${process.env.NEXT_CRYPTO_KEY}`
    ).toString();

    console.log(session);
    (await cookies()).set("session", session, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(uderData.expire),
      path: "/",
    });
  },
  signup: async (name, email, password) => {
    "use server";
    if (!name || !email || !password) {
      return {
        error: "All fields are required",
      };
    }
    try {
      console.log("signup called", name, email, password);
      const { account } = await createAdminClient();
      const result = await account.create(ID.unique(), email, password, name);
      // console.log("signup result is......", result);
      const session = await account.createEmailPasswordSession(email, password);
      // console.log("session created", session);
      await auth.sendVerifyEmail(session.secret);
      console.log("Signup successful.....");
      return {
        success: true,
      };
    } catch (error) {
      console.log("error in signup..", error);
      if (error?.type == "user_already_exists") {
        return {
          error: errorMessages.userAlreadyExists,
        };
      }
      if (error?.message?.includes("Invalid `password` param")) {
        return {
          error: errorMessages.invalidPassword,
        };
      }
      return {
        error: error.message,
      };
    }
  },
  sendVerifyEmail: async (session) => {
    "use server";
    try {
      const { account } = await createSessionClient(session);
      const promise = await account.createVerification(
        "http://localhost:3000/verify-email"
      );
      // console.log(promise);

      await account.deleteSession("current");
      return promise;
    } catch (error) {
      console.log(error);
    }
  },
  verifyEmail: async (userId, secret) => {
    "use server";
    try {
      const { account } = await createSessionClient();
      const promise = await account.updateVerification(userId, secret);
      // console.log(promise);

      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        error: error.message,
      };
    }
  },
  isVerified: async (sessionValue) => {
    "use server";
    try {
      const { account } = await createSessionClient(sessionValue);
      const user = await account.get();
      return user.emailVerification;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  logout: async (sessionValue) => {
    "use server";
    try {
      const { account } = await createSessionClient(sessionValue);
      await account.deleteSession("current");
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        error: error.message,
      };
    }
  },
  deleteCookies: async () => {
    "use server";
    (await cookies()).delete("session");
    (await cookies()).delete("jwt");
  },
};
export default auth;
