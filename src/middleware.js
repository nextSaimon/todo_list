import { NextResponse } from "next/server";
import auth from "./auth";
import { createAdminClient } from "./lib/appwrite";
import CryptoJS from "crypto-js";

const deleteClientCookies = (response, request) => {
  for (const [name] of request.cookies) {
    response.cookies.set(name, "", { maxAge: 0, path: "/" });
  }
};

export async function middleware(request) {
  const response = NextResponse.next();

  const session = request.cookies.get("session");
  if (!session) {
    deleteClientCookies(response, req);
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // console.log(session);
  const decode = CryptoJS.AES.decrypt(
    session.value,
    `${process.env.NEXT_CRYPTO_KEY}`
  ).toString(CryptoJS.enc.Utf8);
  // console.log("decode", decode);

  const [sessionId, userId] = decode.split(";");
  try {
    const { users } = await createAdminClient();
    const jwt = await users.createJWT({
      userId,
      // sessionId,
    });
    console.log(jwt);

    response.cookies.set("jwt", jwt.jwt, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    });
  } catch (error) {
    console.log(error);
    deleteClientCookies(response, request);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!login|signup|verify-email|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
