import Link from "next/link";
import { IoSearchSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";
import { IoMoonSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import { LuSun } from "react-icons/lu";
import { useRouter } from 'next/router';


export default function Header() {
    const router = useRouter();
    const [activeLink, setActiveLink] = useState('/');

    useEffect(() => {
        // Update active link state when the page is reloaded
        setActiveLink(router.pathname);
    }, [router.pathname]);

    const [searchopen, setSearchopen] = useState(false);

    const openSearch = () => {
        setSearchopen(!searchopen);
    };

    const closeSearch = () => {
        setSearchopen(false);
    };


    // aside on off
    const [aside, setAside] = useState(false);

    const asideOpen = () => {
        setAside(true);
    }

    const asideClose = () => {
        setAside(false);
    }
    const handleLinkClick = () => {
        setAside(false); // Close the aside menu
    };


    // darkMode on off
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        // Check local storage for dark mode preference on initial load
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        // Apply dark mode styles when darkMode state changes
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', true);
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', false);
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode); // Toggle dark mode status
    };



    const { alldata, loading } = useFetchData(`/api/getblog`);

    // Filtering publish blogs
    const publishedblogs = alldata.filter(ab => ab.status === "publish")

    const [searchQuery, setSearchQuery] = useState('');
    // Filtering based on search query
    const filteredBlogs = searchQuery.trim() === '' ? publishedblogs : publishedblogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );



    return <>
        <div className="header_sec">
            <div className="container header">
                <div className="logo">
                    <Link href="/"><h1>RoboSuperior</h1></Link>
                </div>
                <div className="searchbar">
                    <IoSearchSharp />
                    <input onClick={openSearch} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder="Discover news, articles and more" />
                </div>

                <div className="nav_list_dark">
                    <ul>
                        <li><Link className={activeLink === '/' ? '!text-[#5485e0]' : ''} href="/">Home</Link></li>
                        <li><Link className={activeLink === '/blog' ? '!text-[#5485e0]' : ''} href="/blog">Blog</Link></li>
                        <li><Link className={activeLink === '/project' ? '!text-[#5485e0]' : ''} href="/project">Projects</Link></li>
                        <li><Link className={activeLink === '/achievement' ? '!text-[#5485e0]' : ''} href="/achievement">Achievements</Link></li>
                        <li><Link className={activeLink === '/about' ? '!text-[#5485e0]' : ''} href="/about">About us</Link></li>
                        <li><Link className={activeLink === '/contact' ? '!text-[#5485e0]' : ''} href="/contact">Contact</Link></li>
                    </ul>
                    <div className="navlist_mobile_ul">
                        <button onClick={toggleDarkMode}>{darkMode ? <IoMoonSharp /> : <LuSun />}</button>
                        <button onClick={openSearch}><IoSearch /></button>
                        <button onClick={asideOpen}><HiBars3BottomRight /></button>
                    </div>
                    <div className="darkmode">
                        <label className="switch">
                            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                            <span className="slider_header"></span>
                        </label>
                    </div>
                </div>

            </div>
            <div className={`search_click ${searchopen ? 'open' : ''}`}>
                <div className="searchab_input">
                    <IoSearchSharp />
                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Discover news, articles and more" />
                </div>
                <div className="search_data text-center">
                    {loading ? <><div className="wh-100 flex flex-center mt-2 pb-5">
                        <div aria-live="assertive" role="alert" className="loader"></div></div></> : <>
                        {searchQuery ? <>{filteredBlogs.slice(0, 3).map((blog) => {
                            return <Link href={`/blog/${blog.slug}`} onClick={closeSearch} key={blog._id} >
                                <div className="blog" >
                                    <div className="bloginfo">
                                        <h3>{blog.title}</h3>
                                        <p>Markdown is a lightweight markup language with plain-text-formatting syntax. Its design allows it to…</p>
                                    </div>
                                </div>
                            </Link>
                        })}</> : <div>No Search Result</div>}

                    </>}
                </div>
                <div className="exit_search" onClick={closeSearch}>
                    <div><FaXmark /></div>
                    <h4>ESC</h4>
                </div>
            </div>
            <div className={aside ? "navlist_mobile open" : "navlist_mobile"}>
                <div className="navlist_m_title flex flex-sb">
                    <h1>RoboSuperior</h1>
                    <button onClick={asideClose}><FaXmark /></button>
                </div>
                <hr />
                <h3 className="mt-3">Main Menu</h3>
                <ul onClick={handleLinkClick}>
                    <li><Link className={activeLink === '/' ? 'text-[#5485e0]' : ''} href="/">Home</Link></li>
                    <li><Link className={activeLink === '/blog' ? 'text-[#5485e0]' : ''} href="/blog">Blog</Link></li>
                    <li><Link className={activeLink === '/project' ? 'text-[#5485e0]' : ''} href="/project">Projects</Link></li>
                    <li><Link className={activeLink === '/achievement' ? 'text-[#5485e0]' : ''} href="/achievement">Achievements</Link></li>
                    <li><Link className={activeLink === '/about' ? 'text-[#5485e0]' : ''} href="/about">About us</Link></li>
                    <li><Link className={activeLink === '/contact' ? 'text-[#5485e0]' : ''} href="/contact">Contact</Link></li>
                </ul>
                <hr />
                <h3 className="mt-3">Topics</h3>
                <ul onClick={handleLinkClick}>
                    <li><Link href="/topics/htmlcssjs">Html css js</Link></li>
                    <li><Link href="/topics/nextjs">Next js</Link></li>
                    <li><Link href="/topics/database">Database</Link></li>
                    <li><Link href="/topics/deployment">Deployment</Link></li>
                </ul>
            </div>
        </div>
    </>
}