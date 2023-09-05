import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}