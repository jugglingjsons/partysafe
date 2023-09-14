import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../../../Db/MongoDBclient';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          userName: profile.login,
          favorites: [],
          cart: [],
          image: profile.avatar_url,
          admin: false,
        };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.JWT_SECRET,

  // Optional SQL or MongoDB database to persist users
  callbacks: {
    async signIn(data) {
      return true;
    },
    async session({ session, user, token }) {
      if (session?.user) {
        session.user.id = user.id;
        session.user.cart = user.cart;
        session.user.favorites = user.favorites;
      }
      return session;
    },
  },
  }; 

export default NextAuth(authOptions);
