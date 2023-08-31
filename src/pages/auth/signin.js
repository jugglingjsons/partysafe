// // pages/auth/signin.js
// import { signIn } from 'next-auth/react'

// export default function SignIn() {
//   return (
//     <div>
//       <form onSubmit={(e) => {
//         e.preventDefault()
//         const formData = new FormData(e.target)
//         const username = formData.get('username')
//         const password = formData.get('password')
//         signIn('credentials', { username, password, callbackUrl: '/after-login' })
//       }}>
//         <input name="username" type="text" placeholder="Username" />
//         <input name="password" type="password" placeholder="Password" />
//         <button type="submit">Sign in</button>
//       </form>
//     </div>
//   )
// }
