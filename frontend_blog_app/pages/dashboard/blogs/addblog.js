import Aside from "@/components/Aside";
import Blog from "@/components/Blog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function Addblog() {
    // const { data: session, status } = useSession();

    const router = useRouter();
    // Check if there's no active session and redirect to login page
    // if (!session) {
    //     router.push('/login');
    //     return null; // Return null or any loading indicator while redirecting
    // }

    // if (status === "loading") {
    //     // Loading state, loader or any other indicator
    //     return <div className='full-h flex flex-center'>
    //         <div className="loading-bar">Loading</div>
    //     </div>;
    // }


    return <>
    <Aside/>
        <div className="m-6 lg:addblogspage">
            <div className="titledashboard flex flex-sb">
                <div data-aos="fade-right">
                    <h2 className="dark:text-[#6466f1]">Add <span className="dark:text-gray-100">Blog</span></h2>
                    <h3 className="dark:text-[#6466f1]" >ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb" data-aos="fade-left">
                    <MdOutlineAddPhotoAlternate className="dark:text-[#6466f1]"/> <span className="dark:text-[#6466f1]">/</span><span className="dark:text-[#6466f1]">Add Blog</span>
                </div>
            </div>
            <div className="blogsad">
                <Blog />
            </div>
        </div>
    </>
}