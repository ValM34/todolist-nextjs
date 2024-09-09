import React from "react";
import Header from "./header";
import Footer from "./footer";
import "../../app/globals.css";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-64px-70px)]">
        {children}
      </div>
      <Footer />
    </div>
  );
}