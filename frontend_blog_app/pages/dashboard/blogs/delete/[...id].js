import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BsPostcard } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function DeleteProduct() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { id } = router.query;

    const [user, setUser] = useState({ value: null });
    const [productInfo, setProductInfo] = useState(null);

    // Check user authentication and token validity
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
                router.push('/login'); // Redirect on error
            }
        };

        checkUser();
    }, [router]);

    // Fetch product information when `id` is available
    useEffect(() => {
        if (id) {
            axios.get('/api/blogs?id=' + id).then(response => {
                setProductInfo(response.data);
            }).catch(error => {
                console.error('Error fetching product info:', error);
                toast.error('Failed to fetch product info');
            });
        }
    }, [id]);

    function goback() {
        router.push('/dashboard/blogs');
    }

    async function deleteProduct() {
        try {
            await axios.delete('/api/blogs?id=' + id);
            toast.success('Deleted Successfully!');
            goback();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
    }

    if (status === "loading" || user.value === null) {
        return (
            <div className='flex flex-col flex-center wh_100'>
                <Loading />
                <h1 className='mt-1'>Loading...</h1>
            </div>
        );
    }

    if (!productInfo) {
        return (
            <div className='flex flex-col flex-center wh_100'>
                <h1>Product not found</h1>
            </div>
        );
    }

    if (user.value === null) {
        return null;
    }

    if (user.value !== null) {
        return (
            <>
                <Head>
                    <title>Delete Blog</title>
                </Head>
                <div className="blogpage">
                    <div className="titledashboard flex flex-sb">
                        <div>
                            <h2 className="dark:!text-[#6466f1]">Delete <span className="dark:!text-gray-100">{productInfo?.title}</span></h2>
                            <h3 className="dark:!text-[#6466f1]">ADMIN PANEL</h3>
                        </div>
                        <div className="breadcrumb">
                            <BsPostcard className="dark:!text-[#6466f1]" /> <span className="dark:!text-[#6466f1]">/</span><span className="dark:!text-[#6466f1]">Delete Blog</span>
                        </div>
                    </div>
                    <div className="deletesec flex flex-center wh_100">
                        <div className="deletecard dark:bg-[#2d3748] dark:text-gray-100">
                            <svg
                                viewBox="0 0 24 24"
                                fill="red"
                                height="6em"
                                width="6em"
                            >
                                <path d="M4 19V7h12v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2M6 9v10h8V9H6m7.5-5H17v2H3V4h3.5l1-1h5l1 1M19 17v-2h2v2h-2m0-4V7h2v6h-2z" />
                            </svg>
                            <p className="cookieHeading dark:text-gray-50">Are you sure?</p>
                            <p className="cookieDescription dark:text-gray-100">If you delete this website content it will be permanently deleted.</p>

                            <div className="buttonContainer">
                                <button onClick={deleteProduct} className="acceptButton dark:text-gray-100">Delete</button>
                                <button onClick={goback} className="declineButton ">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}