import React from "react";
import auth from "@/auth";

export default async function page() {
await auth.getUser();

  return <div>page</div>;
}
