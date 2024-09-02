import Image from "next/image";
import SignIn from "../pages/signin";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import MainLayout from "../components/layouts/mainLayout";
import { useState, useEffect } from 'react';

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const handleSignInState = () => {
    setIsSignedIn(true);
  }
  console.log(isSignedIn)

  useEffect(() => {
    const storedUser : any | null = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
      setIsSignedIn(true);
    }
  }, []);
  return (
    <>
      <Header />
      {isSignedIn ? <div>blmablabla</div> : <SignIn handleSignInState={handleSignInState} />}
      <Footer />
    </>
  );
}
