import React from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';

const Account = () => {
    const { data: session, status } = useSession();

    const handleSignOut = () => {
        signOut();
    };

    if (status === 'authenticated') {
        return (
            <div>
                <p>Welcome, {session.user.name}</p>
                <button onClick={handleSignOut}>Sign out</button>
                <button onClick={() => changePassword()}>Change Password</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not signed in.</p>
                <button onClick={() => signIn('google')}>Sign in</button>
            </div>
        );
    }
};

export default Account;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};

