import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(req) {
  const session = (await cookies()).get("session");
  console.log(session);
  

}
