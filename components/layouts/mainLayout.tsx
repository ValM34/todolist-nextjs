import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="py-10 px-4 lg:px-8">
        {children}
      </div>
      <Footer />
    </div>
  );
}