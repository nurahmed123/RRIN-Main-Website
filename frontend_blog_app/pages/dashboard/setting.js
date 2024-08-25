import Updateuserinfo from "@/components/Updateuserinfo";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import Aside from "@/components/Aside";

export default function setting() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState({ value: null });
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
          setUserID(JWTData.data._id); // Set author from JWT
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
  }, [router]);

  // Fetch product information
  useEffect(() => {
    if (id) {
      axios.get('/api/createuser?id=' + userID)
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching product info:', error);
          // Handle fetch error here if needed
        });
    }
  }, [id]);

  // Handling loading and redirection
  if (status === "loading" || userID === null) {
    return (
      <div className='flex flex-col flex-center wh_100'>
        <Loading />
        <h1 className='mt-1'>Loading...</h1>
      </div>
    );
  }

  console.log(userInfo)

  // Render the component when data is available
  return (
    <>
      <Aside />
      <Head>
        <title>Update Profile</title>
      </Head>
      <div className="m-6 lg:blogpage">
        <div className="titledashboard flex flex-sb">
        </div>
        <div className="mt-3">
          {userInfo && (
            <Updateuserinfo {...userInfo} />
          )}
        </div>
      </div>
    </>
  );
}
