import Blog from "@/components/Blog";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function EditProduct() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [user, setUser] = useState({ value: null });
    const [productInfo, setProductInfo] = useState(null);
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
            axios.get('/api/blogs?id=' + id)
                .then(response => {
                    setProductInfo(response.data);
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

    // Render the component when data is available
    return (
        <>
            <Head>
                <title>Update Blog</title>
            </Head>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2 className="dark:!text-[#6466f1]">Edit <span className="dark:text-gray-100">{productInfo?.title}</span></h2>
                        <h3 className="dark:!text-[#6466f1]">ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard className="dark:!text-[#6466f1]"/> <span className="dark:!text-[#6466f1]">/</span><span className="dark:!text-[#6466f1]">Edit Blog</span>
                    </div>
                </div>
                <div className="mt-3">
                    {productInfo && (
                        <Blog {...productInfo} />
                    )}
                </div>
            </div>
        </>
    );
}