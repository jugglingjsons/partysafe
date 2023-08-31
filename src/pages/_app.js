import '@/styles/globals.css'
import { useSession } from 'next-auth/react'
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';


export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}