import { useSession, SessionProvider } from 'next-auth/react';

export default function Account() {
    const { data: session } = useSession();

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <h1 className="text-center my-4">Your Account</h1>
            
            <div className="p-4 max-w-md mx-auto border rounded shadow">
                <h2 className="text-lg font-semibold mb-2">User Details</h2>
                {session ? (
                    <div>
                        <p>Name: {session.user.name}</p>
                        <p>Email: {session.user.email}</p>
                        {/* Display other user details here */}
                    </div>
                ) : (
                    <p>Please sign in to view your account details.</p>
                )}
            </div>
        </div>
    );
}
