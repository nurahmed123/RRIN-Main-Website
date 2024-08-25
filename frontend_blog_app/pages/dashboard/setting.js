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
  const [userInfo, setUserInfo] = useState(null);
  const { id } = router.query;

  // Check user authentication and token validity
  useEffect(() => {
    const checkUser = () => {
      try {
        const token = localStorage.getItem("Token");
        if (token) {
          setUser({ value: token });
        } else {
          router.push('/login'); // Redirect if no token is found
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
      axios.get('/api/createuser?id=' + id)
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
  if (status === "loading" || user.value === null) {
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
