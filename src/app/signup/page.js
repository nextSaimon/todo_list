import React from "react";
import auth from "@/auth";
import SignupPage from "./Signup_component";

export default function page() {
  return (
    <>
      <SignupPage signupAcction={auth.signup} />
    </>
  );
}
