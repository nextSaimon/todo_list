"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { createWebClient } from "@/lib/appwriteWeb";
import JWTWatcher from "./JWTWatcher";

export default function Page() {
  const [jwt, setJwt] = useState(Cookies.get("jwt"));

  useEffect(() => {
    if (!jwt) return;
    const { account } = createWebClient(jwt);
    try {
      account.get().then(console.log);
    } catch (error) {
      console.log(error);
      Cookies.remove("jwt");
      window.location.reload();
    }
  }, [jwt]);

  return (
    <div>
      <JWTWatcher />
      <p>page</p>{" "}
    </div>
  );
}
