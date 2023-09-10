import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function LoginPage() {
    const router = useRouter();
    const { data: session } = useSession();

    // If the user is already authenticated, redirect to the account page
    if (session) {
        router.replace('/account'); // Replace the current URL with /account
    }

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
    );
}
