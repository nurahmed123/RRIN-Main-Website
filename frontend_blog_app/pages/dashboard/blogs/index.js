import { BsPostcard } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Dataloading from "@/components/Dataloading";
import Aside from "@/components/Aside";

export default function Blogs() {

    // const { data: session, status } = useSession();

    const router = useRouter();
    // login user check
    const [user, setUser] = useState({ value: null })
    const [author, setAuthor] = useState('');

    useEffect(() => {
        const checkUser = () => {
            try {
                const token = localStorage.getItem("Token");
                if (token) {
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace('-', '+').replace('_', '/');
                    const JWTData = JSON.parse(window.atob(base64));
                    setAuthor(JWTData.data._id); // Set author from JWT
                    setUser(JWTData.data); // Set user data if needed
                } else {
                    router.push('/'); // Redirect if no token is found
                }
            } catch (err) {
                console.error(err);
                // localStorage.clear();
                router.push('/'); // Redirect on error
            }
        };
        checkUser();
    }, [router]); // Adding router as a dependency
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


    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState('');
    const { alldata, loading } = useFetchData(`/api/blogs`);

    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const allblog = alldata.length; // Total number of blogs

    // Filter all data based on search query
    const filteredBlogs = searchQuery.trim() === '' ? alldata : alldata.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate index of the first blog displayed on the current page
    const indexOfFirstblog = (currentPage - 1) * perPage;
    const indexOfLastblog = currentPage * perPage;

    // Get the current page's blogs
    const currentBlogs = filteredBlogs.slice(indexOfFirstblog, indexOfLastblog);

    const publishedblogs = currentBlogs.filter(ab => ab.author === author);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

    if (user.value === null) {
        return null;
    }

    if (user.value !== null) {
        return <>
            <Aside />
            <div className="p-[2rem] max-[1043px]:!m-0 blogpage">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2 className="dark:!text-[#6466f1]">All Published<span className="dark:!text-gray-100"> Blogs</span></h2>
                        <h3 className="dark:text-[#6466f1]">ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb dark:text-[#6466f1]" data-aos="fade-left">
                        <BsPostcard className="dark:text-[#6466f1]" /> <span className="dark:text-[#6466f1]">/</span><span><Link className="underline dark:text-[#6466f1]" href="/dashboard/blogs/addblog" >Add Blogs</Link></span>
                    </div>
                </div>
                <div className="blogstable">
                    <div className="flex gap-2 mb-1" data-aos="fade-left">
                        <h2 className="dark:text-gray-100">Search Blogs: </h2>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title..."
                            className="dark:text-gray-200 dark:bg-[#2d3748]"
                        />
                    </div>

                    <table className="table table-styling">

                        <thead data-aos="fade-up">
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody data-aos="fade-up">
                            {loading ? <>
                                <tr>
                                    <td>
                                        <Dataloading />
                                    </td>
                                </tr>
                            </> : <>
                                {publishedblogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center dark:bg-[#2d3748] dark:text-gray-100">No Blogs Available</td>
                                    </tr>
                                ) : (
                                    publishedblogs.map((blog, index) => (
                                        <tr className="text-center dark:bg-[#2d3748] dark:text-gray-100" key={blog._id} >
                                            <td className="text-center dark:bg-[#2d3748] dark:text-gray-100">{indexOfFirstblog + index + 1}</td>
                                            <td className="text-center dark:bg-[#2d3748] dark:text-gray-100"><h3>{blog.title}</h3></td>
                                            <td className="text-center dark:bg-[#2d3748] dark:text-gray-100"><pre>{blog.slug}</pre></td>
                                            <td className="text-center dark:bg-[#2d3748] dark:text-gray-100">
                                                <div className='flex gap-2 flex-center'>
                                                    <Link href={'/dashboard/blogs/edit/' + blog._id}><button title='edit' className=" dark:text-gray-100"><FaEdit />Edit</button></Link>
                                                    <Link href={'/dashboard/blogs/delete/' + blog._id}><button title='delete' className=" dark:text-gray-100"><RiDeleteBin6Fill />Delete</button></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </>
                            }

                        </tbody>
                    </table>
                    {publishedblogs.length === 0 ? (
                        ""
                    ) : (
                        <div className='blogpagination'>
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`${currentPage === number ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                        </div>
                    )}
                </div>

            </div>
        </>
    }

}