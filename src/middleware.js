import { NextResponse } from "next/server";
import auth from "./auth";

const deleteClientCookies = (response, request) => {
  for (const [name] of request.cookies) {
    response.cookies.set(name, "", { maxAge: 0, path: "/" });
  }
};

export async function middleware(request) {
  console.log("middleware called");
  const response = NextResponse.next();
  const session = request.cookies.get("session");
  const authPages = ["/login", "/signup", "/verify-email"];

  if (!session) {
    deleteClientCookies(response, request);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await auth.getUser();

  if (!user) {
    deleteClientCookies(response, request);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const jwt = request.cookies.get("jwt");
  if (!jwt) {
    const jwtToken = await auth.setJWT(session.value);
    response.cookies.set("jwt", jwtToken, {
      httpOnly: false,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 15,
      path: "/",
    });
  }
  //  if user login and try to visite auth pages then redirect to home page
  if (authPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!login|signup|verify-email|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
