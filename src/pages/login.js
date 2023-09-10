import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import AuthAnimation from '../components/AuthAnimation'; // Replace with the correct path

export default function LoginPage() {
    const router = useRouter();

    const handleSignIn = async () => {
        // Perform sign-in logic here, e.g., using signIn from next-auth
        const result = await signIn('google'); // Replace 'google' with your authentication provider

        if (result?.error) {
            // Handle sign-in error
            console.error('Sign-in error:', result.error);
        } else {
            // Redirect to the account page after successful sign-in
            router.push('/account');
        }
    };

    return (
        <div>
            <AuthAnimation />
            <h1>Login Page</h1>
            <button onClick={handleSignIn}>Sign in with Google</button>
        </div>
    );
}
