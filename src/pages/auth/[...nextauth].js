// // pages/api/auth/[...nextauth].js
// import NextAuth from 'next-auth'
// import Providers from 'next-auth/providers'

// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       // The name to display on the sign-in form (e.g. 'Sign in with...')
//       name: 'Credentials',
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       authorize: async (credentials) => {
//         // Add your own authentication logic here to find the user
//         // e.g. query the database to verify credentials
//         if (userIsValid(credentials.username, credentials.password)) {
//           return Promise.resolve({ id: 1, name: 'Your Name', email: 'you@example.com' })
//         } else {
//           return Promise.resolve(null)
//         }
//       }
//     })
//   ]
// })
