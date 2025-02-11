import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
        return (
            <div className='full-h flex flex-center'>
                <div className="loading-bar">Loading</div>
            </div>
        );
    }

    // Pagination settings
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(4); // Default items per page
    const { alldata, loading } = useFetchData('/api/blogs?status=draft');

    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Filtering draft blogs where status is 'draft' and primarystatus is empty
    const draftblogs = alldata.filter(
        (ab) => ab.status === "draft" && ab.primarystatus === ""
    );

    const allblog = draftblogs.length; // Total number of draft blogs
    const indexOfLastblog = currentPage * perPage;
    const indexOfFirstblog = indexOfLastblog - perPage;
    const currentblogs = draftblogs.slice(indexOfFirstblog, indexOfLastblog);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

    // Dropdown for selecting items per page
    const options = [5, 10, 15, 20, 30, 50]; // Updated options

    return (
        <div className="draftblogspage">
            {/* Title dashboard */}
            <div className="titledashboard flex flex-sb">
                <div data-aos="fade-right">
                    <h2>Draft <span>Blogs</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb" data-aos="fade-left">
                    <IoSettingsOutline /> <span>/</span>
                    <span>
                        <Link className="underline" href="/draft">Blogs</Link>
                        <Link className="underline" href="/userpostdraft">UBlogs</Link>
                        <Link className="underline" href="/projectdraft">Projects</Link>
                        <Link className="underline" href="/achievementdraft">Achievements</Link>
                        <Link className="underline" href="/memberdraft">Members</Link>
                    </span>
                </div>
            </div>

            <div className="draftblogs">
                <div className="flex justify-between items-center mb-4">
                    <div className="relative inline-block text-left">
                        <div>
                            <span className="block text-gray-700">Blogs per page:</span>
                            <select
                                value={perPage}
                                onChange={(e) => {
                                    setPerPage(Number(e.target.value));
                                    setCurrentPage(1); // Reset to first page when changing items per page
                                }}
                                className="!mt-1 !block !w-full !p-2 !border !border-gray-300 !rounded-md !shadow-sm focus:!outline-none focus:!ring focus:!ring-blue-200 !transition !duration-150 !ease-in-out"
                            >
                                {options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="blogstable">
                    <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg dark:bg-[#2d3748]">
                        <thead className="bg-[#6466f1] text-white dark:bg-[#6466f1]">
                            <tr>
                                <th className="px-4 py-2 text-left border-b dark:border-gray-200 shadow-lg">#</th>
                                <th className="px-4 py-2 text-left border-b dark:border-gray-200 shadow-lg">Title</th>
                                <th className="px-4 py-2 text-left border-b dark:border-gray-200 shadow-lg">Slug</th>
                                <th className="px-4 py-2 text-left border-b dark:border-gray-200 shadow-lg">Status</th>
                                <th className="px-4 py-2 text-left border-b dark:border-gray-200 shadow-lg">Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 ">Loading...</td>
                                </tr>
                            ) : (
                                <>
                                    {currentblogs.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 ">No Draft Blogs Available</td>
                                        </tr>
                                    ) : (
                                        currentblogs.map((blog, index) => (
                                            <tr key={blog._id} className="border-b dark:border-gray-200 shadow-lg">
                                                <td className="px-4 py-2 border-r dark:border-gray-200 shadow-lg">{indexOfFirstblog + index + 1}</td>
                                                <td className="px-4 py-2 border-r dark:border-gray-200 shadow-lg break-words">{blog.title}</td>
                                                <td className="px-4 py-2 border-r dark:border-gray-200 shadow-lg break-words">{blog.slug}</td>
                                                <td className="px-4 py-2 border-r dark:border-gray-200 shadow-lg">{blog.status || 'Draft'}</td>
                                                <td className="px-4 py-2">
                                                    <div className="flex gap-2">
                                                        <Link href={`/blogs/edit/${blog._id}`}>
                                                            <button className="dark:text-gray-100"><FaEdit /> Edit</button>
                                                        </Link>
                                                        <Link href={`/blogs/delete/${blog._id}`}>
                                                            <button className="dark:text-gray-100 dark:bg-red-500"><RiDeleteBin6Fill /> Delete</button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                    {draftblogs.length === 0 ? null : (
                        <div className='blogpagination'>
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`${currentPage === number ? 'active' : ''} transition duration-200 ease-in-out transform hover:scale-105`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Next</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
