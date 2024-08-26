import Updateuserinfo from "@/components/Updateuserinfo";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import Aside from "@/components/Aside";

export default function Setting() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const { id } = router.query;

  // Check user authentication and token validity
  useEffect(() => {
    const checkUser = () => {
      try {
        const token = localStorage.getItem("Token");
        if (token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace('-', '+').replace('_', '/');
          const JWTData = JSON.parse(window.atob(base64));
          setUserID(JWTData.data._id); // Set user ID from JWT
        } else {
          router.push('/'); // Redirect if no token is found
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        // localStorage.clear();
        router.push('/'); // Redirect on error
      }
    };

    checkUser();
  }, [router]);

  // Fetch user information
  useEffect(() => {
    if (userID) {
      axios.get(`/api/createuser?id=${userID}`)
        .then(response => setUserInfo(response.data))
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, [userID]);

  // Handle loading and redirection
  if (status === "loading" || !userID) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Loading />
        <h1 className="mt-1">Loading...</h1>
      </div>
    );
  }

  // Render the component when data is available
  return (
    <>
      <Aside />
      <Head>
        <title>Update Profile</title>
      </Head>
      <div className="max-[1043px]:!m-0 blogpage">
        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2 className="dark:text-[#6466f1]">Update <span className="dark:text-gray-100">User Profile</span></h2>
            <h3 className="dark:text-[#6466f1]">ADMIN PANEL</h3>
          </div>
        </div>
        <div className="titledashboard flex justify-between">
          {/* Add any content for titledashboard if needed */}
        </div>
        <div className="mt-3">
          {userInfo ? (
            <Updateuserinfo {...userInfo} />
          ) : (
            <p className="dark:text-gray-100">Loading user information...</p>
          )}
        </div>
      </div>
    </>
  );
}
