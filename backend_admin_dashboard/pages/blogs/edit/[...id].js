import Blog from "@/components/Blog";
import Head from "next/head"
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function EditProduct() {


    // login first
    const { data: session, status } = useSession();

    const router = useRouter();
    // Check if there's no active session and redirect to login page
    if (!session) {
        router.push('/login');
        return null; // Return null or any loading indicator while redirecting
    }

    if (status === "loading") {
        // Loading state, loader or any other indicator
        return <div className='flex flex-col flex-center wh_100'>
            <Loading />
            <h1 className='mt-1'>Loading...</h1>
        </div>
    }



    // const router = useRouter();
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/blogs?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id])


    // login then show this
    if (session) {
        return <>

            <Head>
                <title>Update Blog</title>
            </Head>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Edit <span>{productInfo?.title}</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span><span>Edit Blog</span>
                    </div>
                </div>
                <div className="mt-3">
                    {
                        productInfo && (
                            <Blog {...productInfo} />
                        )
                    }
                </div>
            </div>
        </>
    }
}