// pages/_app.js
import "@/styles/globals.css";
import { CartProvider } from '@/context/CartContext';
import Navbar from "@/components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Navbar/>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
