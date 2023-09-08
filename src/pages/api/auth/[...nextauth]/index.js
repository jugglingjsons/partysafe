// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../../Db/MongoDBclient"

export const authOptions = {
    providers: [
        GoogleProvider ({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.JWT_SECRET,

    // Optional SQL or MongoDB database to persist users
    callbacks: {
        async signIn(data) {
console.log("signIn", data)
            return true
      },
      async session ({session}) {
        return session 
}
    },
}

export default NextAuth(authOptions); 