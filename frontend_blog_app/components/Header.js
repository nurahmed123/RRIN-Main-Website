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
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'
import { jwtDecode } from "jwt-decode";

export default function Header() {
    const { data: session, status } = useSession();


    const router = useRouter();
    const [activeLink, setActiveLink] = useState('/');

    // user login
    const [user, setUser] = useState({ value: null })
    const [userImg, setUserImg] = useState("");

    // Check user authentication and token validity
    useEffect(() => {
        const checkUser = () => {
            try {
                const token = localStorage.getItem("Token");
                if (token) {
                    setUser({ value: token })
                    const JWTData = jwtDecode(token);
                    setUserImg(JWTData.data.image)
                } else {
                    router.push('/'); // Redirect if no token is found
                }
            } catch (err) {
                console.error('Error checking user:', err);
                router.push('/'); // Redirect on error
            }
        };

        checkUser();
    }, [router]);

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

    const handleLogout = async () => {
        localStorage.removeItem("Token")
        // await router.refresh();
        await router.push("/")
        router.reload()
    }

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



                        {user.value ? <div className="relative ml-3">
                            <Link href="/dashboard">
                                <div>
                                    <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                                        <Image
                                            src={userImg}
                                            alt="user"
                                            width={32}
                                            height={32}
                                            style={{ height: "2rem", borderRadious: "100%" }}
                                        />
                                    </button>
                                </div>
                            </Link>
                        </div> : ""}


                        {user.value ? <button className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                            <Link className={activeLink === '/login' ? ' !text-white' : ''} href="/" onClick={handleLogout}>Logout</Link>
                        </button> : <button className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                            <Link className={activeLink === '/login' ? ' !text-white' : ''} href="/login">Login</Link>
                        </button>}
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
                        <div aria-live="assertive" role="alert" className="loader m-auto"></div></div></> : <>
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
            <div className={aside ? "navlist_mobile open overflow-auto" : "navlist_mobile"}>
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

                    {user.value ? <div className="relative mb-3">
                        <Link href="/dashboard">
                            <div>
                                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                                    <Image
                                        src={userImg}
                                        alt="user"
                                        width={32}
                                        height={32}
                                        style={{ height: "2rem", borderRadius: "100%" }}
                                    />
                                </button>
                            </div>
                        </Link>
                    </div> : ""}

                    {user.value ? <button className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                        <Link className={activeLink === '/login' ? ' !text-white' : ''} href="/" onClick={handleLogout}>Logout</Link>
                    </button> : <button className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                        <Link className={activeLink === '/login' ? ' !text-white' : ''} href="/login">Login</Link>
                    </button>}

                </ul>

                <hr />
                <h3 className="mt-3">Control Center</h3>
                <ul onClick={handleLinkClick}>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/dashboard/blogs">Blogs</Link></li>
                    <li><Link href="/dashboard/blogs/addblog">Add Blogs</Link></li>
                    <li><Link href="/dashboard/setting">Settings</Link></li>
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