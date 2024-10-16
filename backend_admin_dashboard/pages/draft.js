
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Dataloading from "@/components/Dataloading";

export default function Draft() {

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
    // Filtering draft blogs where status is 'draft' and primarystatus is null
    const draftblogs = currentblogs.filter(ab => ab.status === "draft" && ab.primarystatus === "");



    const allblog = alldata.length; // Total number of blogs

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }


    if (session) {


        return <>
            <div className="draftblogspage">
                {/* title dashboard */}
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Draft <span>Blogs</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <IoSettingsOutline /> <span>/</span><span><Link className="underline" href="/draft">Blogs</Link> <Link className="underline" href="/userpostdraft">UBlogs</Link> <Link className="underline" href="/projectdraft">Projects</Link><Link className="underline" href="/achievementdraft">Achievements</Link><Link className="underline" href="/memberdraft">Members</Link></span>
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
                                            <td colSpan="4" className="text-center">No Draft Blogs Available</td>
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