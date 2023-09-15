import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import AuthAnimation from "../components/AuthAnimation"; // Replace with the correct path
import { EmojiHappyIcon } from "@heroicons/react/solid";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Get the session data

  const handleSignIn = async (provider) => {
    // Perform sign-in logic here, e.g., using signIn from next-auth
    const result = await signIn(provider); // Use the specified provider (e.g., 'google' or 'facebook')

    if (result?.error) {
      // Handle sign-in error
      console.error("Sign-in error:", result.error);
    } else if (result?.url) {
      // Redirect to the authentication provider (e.g., Google)
      window.location.href = result.url;
    } else if (session?.user) {
      // If the user is logged in, redirect to the account page
      router.push("/account");
    }
  };

  return (
    <div>
      <AuthAnimation />
      {session?.user ? (
        // Display welcome message and redirect to account page if user is logged in
        <div>
          <p>Hello {session.user.name}</p>
          <p> Welcome to PartySafe</p>
          <EmojiHappyIcon className="h-6 w-6 text-black-300" />
        </div>
      ) : (
        // Display sign-in buttons for different providers
        <>
          <button onClick={() => handleSignIn("google")}>
            Sign in with Google
          </button>
          <button onClick={() => handleSignIn("facebook")}>
            Sign in with Facebook
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
