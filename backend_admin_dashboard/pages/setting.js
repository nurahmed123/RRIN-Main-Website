import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import Link from "next/link";


export default function Setting() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        // Loading state, loader or any other indicator
        return <div className='full-h flex flex-center'>
            <div className="loading-bar">Loading</div>
        </div>;
    }


    const router = useRouter();
    // Check if there's no active session and redirect to login page
    if (!session) {
        router.push('/login');
        return null; // Return null or any loading indicator while redirecting
    }

    async function logout() {
        await router.push('/login');
        await signOut();
    }


    if (session) {
        return (
            <div className="settingpage">
                {/* title dashboard */}
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Admin <span>Settings</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <IoSettingsOutline /> <span>/</span><span>Settings</span>
                    </div>
                </div>

                <div className="profilesettings">
                    <div className="leftprofile_details flex">
                        <img src="/img/user.png" alt="coder" data-aos="fade-left" />
                        <div className="w-100" data-aos="fade-up">
                            <div className='flex flex-sb flex-left mt-2'>
                                <h2>My Profile:</h2>
                                <h3>RoboSuperior <br /> <Link target="_blank" href={'https://linkedin.com/in/06nurahmed'} >Nur Ahmad</Link></h3>
                            </div>
                            <div className="flex flex-sb mt-2">
                                <h3>Phone:</h3>
                                <input type="text" tel="+8801886772094" defaultValue="+880 1886772094" />
                            </div>
                            <div className="mt-2">
                                <input type="email" defaultValue="contact.robosuperior@gmail.com" />
                            </div>
                            <div className="flex flex-center w-100 mt-2">
                                <button>Save</button>
                            </div>
                        </div>

                    </div>
                    <div className="rightlogoutsec" data-aos="fade-left">
                        <div className="topaccoutnbox">
                            <h2 className="flex flex-sb">My Account <MdOutlineAccountCircle /></h2>
                            <hr />
                            <div className="flex flex-sb mt-1">
                                <h3>Active Account <br /> <span>Email</span></h3>
                                <button onClick={logout}>Log Out</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }


}