import { BsPostcard } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Dataloading from "@/components/Dataloading";
import Image from "next/image";

export default function Blogs() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect to login if no session
    if (!session) {
        router.push('/login');
        return null;
    }

    if (status === "loading") {
        return <div className='full-h flex flex-center'>
            <div className="loading-bar">Loading</div>
        </div>;
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(7); // Allow user to change per page
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch all blogs data
    const { alldata, loading } = useFetchData(`/api/drive`);

    // Filter the blogs to show only those that are published
    // const publishedBlogs = alldata.filter(blog => blog.status === "publish");

    // Implement search functionality on the published blogs
    const filteredBlogs = searchQuery.trim() === '' ? alldata : alldata.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic for the published blogs
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredBlogs.length / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className="blogpage p-8">
                <div className="titledashboard flex justify-between items-center mb-6">
                    <div data-aos="fade-right">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">All Published<span> File</span></h2>
                        <h3 className="text-lg text-gray-600 dark:text-gray-300">ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb flex items-center text-gray-600 dark:text-gray-300" data-aos="fade-left">
                        <BsPostcard className="mr-2" />
                        <span>/</span>
                        <span><Link className="underline ml-2" href="/blogs/addblog">Add Blogs</Link></span>
                    </div>
                </div>

                <div className="blogstable">
                    <div className="flex gap-2 mb-4" data-aos="fade-left">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">Search Name: </h2>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title..."
                            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        {/* <select
                            isRequired
                            className="block shadow-2xl w-[15rem] p-4 border-gray-300 !rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#6466f1] focus:border-transparent"
                        // onChange={handelOparation}
                        >
                            <option value="$.0">All</option>
                            <option value="$.1">Amount</option>
                            <option value="$.2">Note</option>
                        </select> */}
                        <div className="blogpagination">
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 !rounded-lg !cursor-pointer bg-gray-50 !focus:outline-none mx-4 dark:bg-gray-700 dark:border-gray-600" id="multiple_files" type="file" multiple />
                            <button type="button" class="active">Upload</button>
                        </div>

                    </div>

                    <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg dark:bg-[#2d3748]">
                        <thead className="bg-[#6466f1] text-white dark:bg-[#6466f1]">
                            <tr>
                                <th className="px-4 py-2 text-left border-b dark:border-gray-200 shadow-lg">#</th>
                                <th className="px-4 py-2 text-left border-b dark:border-gray-200 shadow-lg">Image</th>
                                <th className="px-4 py-2 text-left border-b dark:border-gray-200 shadow-lg">Url</th>
                                <th className="px-4 py-2 text-left border-b dark:border-gray-200 shadow-lg">Name</th>
                                <th className="px-4 py-2 text-left border-b dark:border-gray-200 shadow-lg">Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 "><Dataloading />Loading...</td>
                                </tr>
                            ) : (
                                <>
                                    {currentBlogs.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 ">No File Available</td>
                                        </tr>
                                    ) : (
                                        currentBlogs.map((blog, index) => (
                                            <tr key={blog._id} className="border-b dark:border-gray-200 shadow-lg">
                                                <td className="px-4 py-2 border-r dark:border-gray-200 shadow-lg">{indexOfFirstBlog + index + 1}</td>
                                                <td className="px-4 py-2 border-r dark:border-gray-200 shadow-lg break-words"><Image src={blog.url} width={50} height={50} /></td>
                                                <td className="px-4 py-2 border-r dark:border-gray-200 shadow-lg break-words">{blog.url}</td>
                                                <td className="px-4 py-2 border-r dark:border-gray-200 shadow-lg">{blog.name}</td>
                                                <td className="px-4 py-2">
                                                    <div className="flex gap-2">
                                                        <Link href={`/blogs/edit/${blog._id}`}>
                                                            <button className="dark:text-gray-100 bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded transition"><FaEdit /> Edit</button>
                                                        </Link>
                                                        <Link href={`/blogs/delete/${blog._id}`}>
                                                            <button className="dark:text-gray-100 bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded transition"><RiDeleteBin6Fill /> Delete</button>
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

                    {filteredBlogs.length > 0 && (
                        <div className="flex justify-between items-center mt-6">
                            <div>
                                <select
                                    value={perPage}
                                    onChange={(e) => setPerPage(parseInt(e.target.value))}
                                    className="!border !border-gray-300 dark:!border-gray-600 !px-3 !py-2 !rounded-lg focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !transition"
                                >
                                    <option value={5}>5 per page</option>
                                    <option value={7}>7 per page</option>
                                    <option value={10}>10 per page</option>
                                    <option value={20}>20 per page</option> {/* Added 20 */}
                                </select>
                            </div>
                            <div className='flex gap-2'>
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg transition ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                                >
                                    Previous
                                </button>
                                {pageNumbers.slice(Math.max(currentPage - 2, 0), Math.min(currentPage + 1, pageNumbers.length)).map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`px-4 py-2 rounded-lg transition ${currentPage === number ? 'bg-blue-700 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentBlogs.length < perPage}
                                    className={`px-4 py-2 rounded-lg transition ${currentBlogs.length < perPage ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
