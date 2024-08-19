import Aside from '@/components/Aside'
import { useState, useEffect } from "react";
import React from 'react'
import { useRouter } from "next/router";


const setting = () => {
  const router = useRouter();
  // login user check
  const [user, setUser] = useState({ value: null })

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
        localStorage.clear();
        router.push('/'); // Redirect on error
      }
    };

    checkUser();
  }, [router]); // Adding router as a dependency

  if (user.value === null) {
    return null;
  }

  if (user.value !== null) {
    return (
      <div>
        <Aside />
        <p>this is a p tag</p>
      </div>
    )
  }
}

export default setting
