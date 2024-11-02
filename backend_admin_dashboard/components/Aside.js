import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react'

export default function Aside() {
    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    const handleClick = () => {
        setClicked(!clicked);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false);
    };

    useEffect(() => {
        // Update active link state when the page is reloaded
        setActiveLink(router.pathname);
    }, [router.pathname]);

    return <>
        <aside className="asideleft">
            <ul>
                <Link href="/">
                    <li className={activeLink === '/' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/')}>
                        <IoHome />
                        <span>Dashboard</span>
                    </li>
                </Link>
                <Link href="/blogs">
                    <li className={activeLink === '/blogs' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/blogs')}>
                        <BsPostcard />
                        <span>Blogs</span>
                    </li>
                </Link>
                <Link href="/projects">
                    <li className={activeLink === '/projects' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/projects')}>
                        <BsPostcard />
                        <span>Projects</span>
                    </li>
                </Link>
                <Link href="/achievements">
                    <li className={activeLink === '/achievements' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/achievements')}>
                        <BsPostcard />
                        <span>Achievements</span>
                    </li>
                </Link>
                <Link href="/members">
                    <li className={activeLink === '/members' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/members')}>
                        <BsPostcard />
                        <span>Members</span>
                    </li>
                </Link>
                <Link href="/drive">
                    <li className={activeLink === '/drive' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/drive')}>
                        <BsPostcard />
                        <span>Drive</span>
                    </li>
                </Link>

                <Link href="/draft">
                    <li className={activeLink === '/draft' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/draft')}>
                        <MdOutlinePending />
                        <span>Pending</span>
                    </li>
                </Link>

                <Link href="/setting">
                    <li className={activeLink === '/setting' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/setting')}>
                        <IoSettingsOutline />
                        <span>Settings</span>
                    </li>
                </Link>


                {/* <Link href="/blogs/addblog">
                    <li className={activeLink === '/blogs/addblog' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/blogs/addblog')}>
                        <MdOutlineAddPhotoAlternate />
                        <span>AddBlog</span>
                    </li>
                </Link>
                <Link href="/projects/addproject">
                    <li className={activeLink === '/projects/addproject' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/projects/addproject')}>
                        <MdOutlineAddPhotoAlternate />
                        <span>Add Projects</span>
                    </li>
                </Link>
                <Link href="/achievements/addachievement">
                    <li className={activeLink === '/achievements/addachievement' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/achievements/addachievement')}>
                        <MdOutlineAddPhotoAlternate />
                        <span>Add Achievements</span>
                    </li>
                </Link>
                <Link href="/achievementdraft">
                    <li className={activeLink === '/achievementdraft' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/achievementdraft')}>
                        <MdOutlinePending />
                        <span>Ach Pending</span>
                    </li>
                </Link>
                <Link href="/projectdraft">
                    <li className={activeLink === '/projectdraft' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/projectdraft')}>
                        <MdOutlinePending />
                        <span>Proj Pending</span>
                    </li>
                </Link> */}


                
                
                
            </ul>
        </aside>

    </>
}
