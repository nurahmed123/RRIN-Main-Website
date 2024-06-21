import Achievement from "@/components/Achievement";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function Addachievement() {
    const { data: session, status } = useSession();

    const router = useRouter();
    // Check if there's no active session and redirect to login page
    if (!session) {
        router.push('/login');
        return null; // Return null or any loading indicator while redirecting
    }

    if (status === "loading") {
        // Loading state, loader or any other indicator
        return <div className='full-h flex flex-center'>
            <div className="loading-bar">Loading</div>
        </div>;
    }


    return <>
        <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                <div data-aos="fade-right">
                    <h2>Add <span>Achievements</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb" data-aos="fade-left">
                    <MdOutlineAddPhotoAlternate /> <span>/</span><span>Add Achievements</span>
                </div>
            </div>
            <div className="blogsadd">
                <Achievement />
            </div>
        </div>
    </>
}