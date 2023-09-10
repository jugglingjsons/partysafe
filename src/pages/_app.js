import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import { appWithTranslation } from 'next-i18next'; // Import appWithTranslation

function App({ Component, pageProps: { session, ...pageProps } }) {
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

export default appWithTranslation(App); // Wrap your App component with appWithTranslation
