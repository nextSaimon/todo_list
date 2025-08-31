"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function JWTWatcher() {
  const [jwt, setJwt] = useState(Cookies.get("jwt"));

  useEffect(() => {
    const interval = setInterval(() => {
      const newJwt = Cookies.get("jwt");

      // Reload if cookie is missing
      if (!newJwt) {
        window.location.reload();
        return;
      }

      // Reload if cookie value changed
      if (newJwt !== jwt) {
        setJwt(newJwt);
        Cookies.remove("jwt");
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [jwt]);

  return null; // This component doesn't render anything
}
