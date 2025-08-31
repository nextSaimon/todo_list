import { NextResponse } from "next/server";
import auth from "./auth";

// Helper function to delete all client-sent cookies on a given response
const deleteClientCookies = (response, request) => {
  for (const [name] of request.cookies) {
    response.cookies.set(name, "", { maxAge: 0, path: "/" });
  }
};

export async function middleware(request) {
  console.log("middleware called");
  const response = NextResponse.next();
  const session = request.cookies.get("session");

  if (!session) {
    deleteClientCookies(response, request);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await auth.getUser();
  if (!user) {
    deleteClientCookies(response, request);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // get jwt cookie
  const jwt = request.cookies.get("jwt");
  if (!jwt) {
    const jwtToken = await auth.setJWT(session.value);
    response.cookies.set("jwt", jwtToken, {
      httpOnly: false,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 15,
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!login|signup|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
