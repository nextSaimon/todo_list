import React from "react";
import VerifyEmailPage from "./VerifyEmail";
import auth from "@/auth";
export default function page() {
  return (
    <div>
      <VerifyEmailPage verifyAction={auth.verifyEmail} />
    </div>
  );
}
