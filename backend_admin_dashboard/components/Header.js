import { GoScreenFull } from "react-icons/go";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { BiExitFullscreen } from "react-icons/bi";
import { useState } from "react";

export default function Header() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullscreen(true);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() => {
                    setIsFullscreen(false);
                });
            }
        }
    };

    return <>

        <header className='header flex flex-sb'>
            <div className="logo flex gap-2">
                <h1>ADMIN</h1>
                <div className="headerham flex flex-center">
                    <RiBarChartHorizontalLine />
                </div>
            </div>
            <div className="rightnav flex gap-2">
                <div onClick={toggleFullscreen}>
                    {isFullscreen ? <BiExitFullscreen /> : <GoScreenFull />}
                </div>
                <div className="notification">
                    <img src="/img/notification.png" alt="notification" />
                </div>
                <div className="profilenav">
                    <img src="/img/user.png" alt="user" />
                </div>
            </div>
        </header>
    </>
}