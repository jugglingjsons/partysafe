// pages/_app.js

import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head'; // Import Head component
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* Other head elements */}
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}
