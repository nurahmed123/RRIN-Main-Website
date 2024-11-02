'use client';
import { BsPostcard } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Dataloading from "@/components/Dataloading";
import Image from "next/image";
import { useEdgeStore } from "@/lib/edgestore";
import axios from "axios";

export default function Drive() {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect to login if no session
    useEffect(() => {
        if (!session) {
            router.push('/login');
        }
    }, [session, router]);

    if (status === "loading") {
        return <div className='full-h flex flex-center'>
            <div className="loading-bar">Loading</div>
        </div>;
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [file, setFile] = useState(null);
    const { edgestore } = useEdgeStore();
    const [progress, setProgress] = useState();
    const [url, setUrl] = useState('');
    const [size, setSize] = useState('');
    const [name, setName] = useState('');
    const { alldata, loading } = useFetchData(`/api/drive`);

    const filteredFiles = searchQuery.trim() === '' ? alldata : alldata.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfFirstFile = (currentPage - 1) * perPage;
    const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfFirstFile + perPage);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredFiles.length / perPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFileUpload = async () => {
        if (!file) return;

        try {
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => setProgress(progress),
            });

            // Set the URL only after the upload completes
            const uploadUrl = res.url;
            const uploadSize = res.size;
            setUrl(uploadUrl);
            setSize(uploadSize);
            setProgress(); // Reset progress

            // Now upload to the database
            await uploadToDatabase(uploadUrl, name, uploadSize); // Pass URL and name to the upload function
        } catch (error) {
            console.error("Error during file upload:", error);
        }
    };

    async function uploadToDatabase(uploadUrl, name, uploadSize) {
        if (!uploadUrl || !name) return; // Ensure url and name are defined

        const data = { url: uploadUrl, name, size: uploadSize };
        try {
            await axios.post('/api/drive', data);
            // Reset fields after successful upload
            router.push("/drive")
            setFile(null);
            setName('');
            setUrl('');
        } catch (err) {
            console.error("Error uploading data:", err);
        }
    }

    async function deleteFile(id) {
        router.push(`/drive/delete/${id}`)
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) {
            return `${bytes} B`; // Display in bytes if less than 1 KB
        } else if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(2)} KB`; // Convert to KB if less than 1 MB
        } else {
            return `${(bytes / (1024 * 1024)).toFixed(2)} MB`; // Convert to MB if 1 MB or larger
        }
    }

    return (
        <div className="blogpage p-8">
            <div className="titledashboard flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">All Published<span> File</span></h2>
                <div className="breadcrumb flex items-center text-gray-600 dark:text-gray-300">
                    <BsPostcard className="mr-2" />
                    <span><div className="underline ml-2 cursor-default">Add Files</div></span>
                </div>
            </div>

            <div className="blogstable">
                <div className="flex gap-2 mb-4">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">Search Name: </h2>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name..."
                        className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {
                        progress > 0 || progress === 0 ? (
                            <div id="UpProgress" className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                <div id="UpProgressIn" className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progress}%` }}>{progress}%</div>
                            </div>
                        ) : (
                            <div className="blogpagination">
                                <input
                                    disable={true}
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Give an image name"
                                    className="border border-gray-300 px-4 py-2 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                                <input onChange={(e) => setFile(e.target.files?.[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mx-4 dark:bg-gray-700 dark:border-gray-600" id="multiple_files" type="file" />
                                <button disabled={!name || !file} onClick={handleFileUpload} className="active">Upload</button>
                            </div>
                        )
                    }
                </div>

                <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg dark:bg-[#2d3748]">
                    <thead className="bg-[#6466f1] text-white">
                        <tr>
                            <th className="px-4 py-2 text-left border-b dark:border-gray-200">#</th>
                            <th className="px-4 py-2 text-left border-b dark:border-gray-200">Image</th>
                            <th className="px-4 py-2 text-left border-b dark:border-gray-200">Url ( Click to copy )</th>
                            <th className="px-4 py-2 text-left border-b dark:border-gray-200">Name</th>
                            <th className="px-4 py-2 text-left border-b dark:border-gray-200">Size</th>
                            <th className="px-4 py-2 text-left border-b dark:border-gray-200">Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4"><Dataloading />Loading...</td>
                            </tr>
                        ) : (
                            currentFiles.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">No File Available</td>
                                </tr>
                            ) : (
                                currentFiles.map((file, index) => (
                                    <tr key={file._id} className="border-b dark:border-gray-200">
                                        <td className="px-4 py-2 border-r dark:border-gray-200">{indexOfFirstFile + index + 1}</td>
                                        <td className="px-4 py-2 border-r dark:border-gray-200 break-words">
                                            {/\.(jpeg|jpg|gif|png|svg|webp|bmp)$/i.test(file.url) ? (
                                                <Image src={file.url} width={50} height={50} alt={file.name} />
                                            ) : (
                                                <span>File not supported</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 border-r dark:border-gray-200 break-words cursor-pointer hover:underline-offset-2 hover:underline" onClick={() => navigator.clipboard.writeText(file.url)}>{file.url}</td>
                                        <td className="px-4 py-2 border-r dark:border-gray-200">{file.name}</td>
                                        <td className="px-4 py-2 border-r dark:border-gray-200">{formatFileSize(file.size)}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex gap-2">
                                                <Link href={`/drive`}>
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded transition"><FaEdit /> Edit</button>
                                                </Link>
                                                <spam onClick={() => deleteFile(file._id)}>
                                                    <button className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded transition"><RiDeleteBin6Fill /> Delete</button>
                                                </spam>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                        )}
                    </tbody>
                </table>

                {filteredFiles.length > 0 && (
                    <div className="flex justify-between items-center mt-6">
                        <div>
                            <select
                                value={perPage}
                                onChange={(e) => setPerPage(parseInt(e.target.value))}
                                className="!border !border-gray-300 dark:!border-gray-600 !px-3 !py-2 !rounded-lg focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !transition"
                            >
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={15}>15 per page</option>
                                <option value={20}>20 per page</option>
                                <option value={50}>50 per page</option>
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
                                disabled={currentFiles.length < perPage}
                                className={`px-4 py-2 rounded-lg transition ${currentFiles.length < perPage ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
