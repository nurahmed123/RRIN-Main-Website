import Aside from '@/components/Aside'
import UserProfile from '@/components/userProfile'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';


const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState({ value: null });
  
  useEffect(() => {
    const checkUser = () => {
      try {
        const token = localStorage.getItem("Token");
        if (token) {
          setUser({ value: token });
        } else {
          router.push('/'); // Redirect if no token is found
        }
      } catch (err) {
        console.error(err);
        // localStorage.clear();
        router.push('/'); // Redirect on error
      }
    };
    
    checkUser();
  }, [router]); // Adding router as a dependency

  // Early return or loading state if necessary
  if (user.value === null) {
    return null; // You can also show a loading spinner or placeholder here
  }

  return (
    <div>
      <Aside />
      <UserProfile />
    </div>
  );
};

export default Dashboard;
