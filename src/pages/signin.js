// import { signIn } from 'next-auth/react';
// import { useState } from 'react';

// function SignIn() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);

//     const handleSignIn = async (e) => {
//         e.preventDefault();

//         // Using next-auth's signIn method
//         const result = await signIn('credentials', { 
//             redirect: false,
//             email,
//             password
//         });

//         if (!result.ok) {
//             setError('Sign-in failed! Check your credentials.');
//         }
//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-200">
//             <div className="bg-white p-8 rounded shadow-md w-96">
//                 <h1 className="text-2xl mb-4">Sign In</h1>
//                 {error && <p className="text-red-500 mb-4">{error}</p>}
//                 <form onSubmit={handleSignIn}>
//                     <div className="mb-4">
//                         <label className="block text-sm mb-2" htmlFor="email">Email</label>
//                         <input 
//                             id="email" 
//                             type="email" 
//                             value={email} 
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="p-2 w-full border rounded"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm mb-2" htmlFor="password">Password</label>
//                         <input 
//                             id="password" 
//                             type="password" 
//                             value={password} 
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="p-2 w-full border rounded"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
//                             Sign In
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default SignIn;
