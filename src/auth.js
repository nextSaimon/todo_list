import { createSessionClient, createAdminClient } from "./lib/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
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

  login: async (email, password) => {
    "use server";

    try {
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);
      // console.log("login session is......", session);

      (await cookies()).set("session", session.secret, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        expires: new Date(session.expire),
        path: "/",
      });
      const jwt = await auth.setJWT(session.secret);
      (await cookies()).set("jwt", jwt, {
        httpOnly: false,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 15,
        path: "/",
      });
      // await auth.setJWT(session.secret);

      return {
        success: true,
      };
    } catch (error) {
      console.log("Error in login......", error);
      if (error?.type == "general_argument_invalid") {
        return {
          error: "Invalid credentials. Please check the email and password.",
        };
      }
      return { error: error.message };
    }
  },
};
export default auth;
