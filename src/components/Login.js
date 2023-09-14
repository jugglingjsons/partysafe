import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AuthAnimation from "../components/AuthAnimation"; // Replace with the correct path

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Get the session data

  const handleSignIn = async () => {
    // Perform sign-in logic here, e.g., using signIn from next-auth
    const result = await signIn("google"); // Replace 'google' with your authentication provider

    if (result?.error) {
      // Handle sign-in error
      console.error("Sign-in error:", result.error);
    } else {
      // Check if the user is logged in (session exists) before redirecting
      if (session) {
        // Redirect to the account page after successful sign-in
        router.push("/account");
      } else {
        // Handle the case where the user is not logged in
      }
    }
  };

  return (
    <div>
      <AuthAnimation />
      <h1>Login Page</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;