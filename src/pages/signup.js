import { useState } from 'react';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        // Validate password confirmation
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
    
        try {
            const result = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            if (!result.ok) {
                const data = await result.json();
                setError(data.error);
            } else {
                // Handle successful sign-up
                // This can be redirecting the user to a confirmation page, login page, etc.
                router.push('/login'); // Assuming you have a login page at /login
            }
        } catch (error) {
            setError('Sign-up failed. Please try again.');
        }
    }
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl mb-4">Sign Up</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <label className="block text-sm mb-2" htmlFor="email">Email</label>
                        <input 
                            id="email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 w-full border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2" htmlFor="password">Password</label>
                        <input 
                            id="password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 w-full border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            id="confirmPassword" 
                            type="password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="p-2 w-full border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
