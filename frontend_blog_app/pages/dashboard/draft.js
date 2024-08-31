
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useFetchData from "@/hooks/useFetchData";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Dataloading from "@/components/Dataloading";
import Aside from "@/components/Aside";

export default function Draft() {

    // const { data: session, status } = useSession();
    const [user, setUser] = useState({ value: null })
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
                // localstorage.clear();
                router.push('/'); // Redirect on error
            }
        };

        checkUser();
    }, [router]); // Adding router as a dependency

    // pagination blogs
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(4);
    const { alldata, loading } = useFetchData('/api/blogs');

    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastblog = currentPage * perPage;
    const indexOfFirstblog = indexOfLastblog - perPage;
    const currentblogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

    // Filtering draft blogs
    const draftblogs = currentblogs.filter(ab => ab.status === "userdraft");


    const allblog = alldata.length; // Total number of blogs

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
            <div className="draftblogspage">
                {/* title dashboard */}
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2 className="dark:text-[#6466f1]">Draft <span className="dark:text-gray-100">Blogs</span></h2>
                        <h3 className="dark:text-[#6466f1]">ADMIN PANEL</h3>
                    </div>

                </div>

                <div className="draftblogs">
                    <div className="blogstable">
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
                                    {draftblogs.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center dark:text-gray-200 dark:bg-[#2d3748]">No Draft Blogs Available</td>
                                        </tr>
                                    ) : (
                                        draftblogs.map((blog, index) => (
                                            <tr key={blog._id}>
                                                <td>{index + 1}</td>
                                                <td><h3>{blog.title}</h3></td>
                                                <td><pre>{blog.slug}</pre></td>
                                                <td>
                                                    <div className='flex gap-2 flex-center'>
                                                        <Link href={'/blogs/edit/' + blog._id}><button title='edit'><FaEdit />Edit</button></Link>
                                                        <Link href={'/blogs/delete/' + blog._id}><button title='delete'><RiDeleteBin6Fill />Delete</button></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </>
                                }

                            </tbody>
                        </table>
                        {draftblogs.length === 0 ? (
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
                                <button onClick={() => paginate(currentPage + 1)} disabled={currentblogs.length < perPage}>Next</button>
                            </div>
                        )
                        }

                    </div>
                </div>
            </div>
        </>
    }
}