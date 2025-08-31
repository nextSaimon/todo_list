import Login_component from "./Login_component";
import auth from "@/auth";
export default function LoginPage() {

  return (
    <>
      <Login_component loginAction={auth.login} />
    </>
  );
}
