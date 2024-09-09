import React from "react";
import type { AppProps } from 'next/app';
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import "../style/globals.css";
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-64px-70px)]">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  )
}
