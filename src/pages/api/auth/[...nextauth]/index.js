import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../../../Db/MongoDBclient';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.JWT_SECRET,

  // Optional SQL or MongoDB database to persist users
  callbacks: {
    async signIn(data) {
      console.log('signIn', data);
      return true;
    },
    async profile(profile) {
      return {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        userName: profile.login,
        githubId: profile.id,
        image: profile.avatar_url,
        admin: false,
      };
    },
    async session({ session, user, token }) {
      if (session?.user) {
        session.user.id = user.id;
        session.user.githubId = user.githubId;
        session.user.email = user.email;
        session.user.admin = user.admin;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
