import SignIn from "./signin/signin";
import TasksList from "./taskslist/tasksList";
import MainLayout from "../components/layouts/mainLayout";
import { useState, useEffect } from 'react';
import { verifyToken } from "./services/verifyToken";

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const handleSignInState = () => {
    setIsSignedIn(true);
  }

  useEffect(() => {
    let storedUser : any | null = localStorage.getItem('user');
    if (storedUser) {
      storedUser = JSON.parse(storedUser);
      setIsSignedIn(true);
      const getUserByToken = async () => {
        const userDecoded = await verifyToken(storedUser.token);
        setUser(userDecoded);
      }
      if(!user) {
        getUserByToken();
      }
    }
  }, [user]);
  
  return (
    <>
      <MainLayout>
        {isSignedIn ? <TasksList /> : <SignIn handleSignInState={handleSignInState} />}
      </MainLayout>
    </>
  );
}
