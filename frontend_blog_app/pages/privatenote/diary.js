import { BsPostcard } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Aside from "@/components/Aside";
import React from "react";
import { jwtDecode } from "jwt-decode";
import Head from "next/head";
import toast from "react-hot-toast";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";

export default function userDiary() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState('opaque');
    const appLogoUrl = `https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/37b0a981-7d1e-4c79-ae16-47d31e4be6fa.png`;

    const router = useRouter();
    const [user, setUser] = useState({ value: null });
    const [author, setAuthor] = useState('');
    const [username, setUsername] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5); // Default number of blogs per page
    const [searchQuery, setSearchQuery] = useState('');

    const [option, setOption] = useState('');
    const [note, setNote] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [reason, setReason] = useState('');
    const [cost, setCost] = useState();
    const [searchItem, setSearchItem] = useState();
    const [transType, setTransType] = useState();
    const [waiting, setWaiting] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null); // Track the note being edited

    const handleOpen = (backdrop) => {
        setBackdrop(backdrop);
        onOpen();
    };

    // Fetch all blogs on component load
    const { alldata, loading } = useFetchData(`/api/diary?userid=${author}`);
    let allNotes = alldata;

    useEffect(() => {
        const checkUser = () => {
            try {
                const token = localStorage.getItem("Token");
                if (token) {
                    const JWTData = jwtDecode(token);
                    setAuthor(JWTData.data._id); // Set author from JWT
                    setUsername(JWTData.data.username); // Set author from JWT
                    setUser(JWTData.data); // Set user data if needed
                } else {
                    router.push('/login'); // Redirect if no token is found
                }
            } catch (err) {
                console.error(err);
                router.push('/login'); // Redirect on error
            }
        };
        checkUser();
    }, [router]);

    function closeReset() {
        setOption('');
        setNote('');
        setTransactionType('');
        setReason('');
        setCost('');
        onClose()
    }

    useEffect(() => {
        if (editingNoteId) {
            const noteToEdit = allNotes.find(note => note._id === editingNoteId);
            if (noteToEdit) {
                setOption(noteToEdit.note ? 'note' : 'hisab');
                setNote(noteToEdit.note || '');
                setTransactionType(noteToEdit.transactionType || '');
                setReason(noteToEdit.reason || '');
                setCost(noteToEdit.cost || '');
            }
        } else {
            setNote('');
            setTransactionType('');
            setReason('');
            setCost('');
        }
    }, [editingNoteId, allNotes]);

    // Filter blogs by author first, then by search query
    const filteredBlogs = useMemo(() => {
        // Helper function to filter by search query
        const filterBySearchQuery = (notes, key) => {
            return notes.filter(note =>
                note[key] && note[key].toLowerCase().includes(searchQuery.toLowerCase())
            );
        };

        if (searchItem === "$.1") {
            // Filtering by 'cost' with transaction type (debit/credit/all)
            const costNotes = allNotes.filter(note => note.cost);

            if (transType === "debit") {
                return filterBySearchQuery(
                    costNotes.filter(note => note.transactionType === "debit"),
                    "reason"
                );
            } else if (transType === "credit") {
                return filterBySearchQuery(
                    costNotes.filter(note => note.transactionType === "credit"),
                    "reason"
                );
            } else if (transType === "borrowed") {
                return filterBySearchQuery(
                    costNotes.filter(note => note.transactionType === "borrowed"),
                    "reason"
                );
            } else if (transType === "lent") {
                return filterBySearchQuery(
                    costNotes.filter(note => note.transactionType === "lent"),
                    "reason"
                );
            } else {
                return filterBySearchQuery(costNotes, "reason");
            }
        } else if (searchItem === "$.2") {
            // Filtering by 'note'
            return filterBySearchQuery(allNotes.filter(note => note.note), "note");
        } else {
            // Default: Filtering all notes by 'note'
            return allNotes.filter(note =>
                note.note.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    }, [searchItem, searchQuery, allNotes, transType]);


    const totalCost = useMemo(() => {
        const calculateTotalCost = (array) => {
            if (!Array.isArray(array)) return 0; // Ensure array is valid
            return array.reduce((total, item) => total + parseInt(item.cost, 10), 0);
        };

        return calculateTotalCost(filteredBlogs);
    }, [filteredBlogs, searchItem, searchQuery, allNotes, transType]);



    // Calculate total number of filtered blogs
    const totalFilteredBlogs = filteredBlogs.length;
    // Calculate the currently displayed blogs with pagination logic
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Pagination page numbers calculation
    const pageNumbers = useMemo(() => {
        const totalPages = Math.ceil(totalFilteredBlogs / perPage);
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }, [totalFilteredBlogs, perPage]);

    // Paginate function to change page
    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= pageNumbers.length) {
            setCurrentPage(pageNumber);
        }
    };

    async function createProduct(ev) {
        ev.preventDefault();
        setWaiting(true);

        const data = { userid: author, username, transactionType, reason, note, cost };

        try {
            if (editingNoteId) {
                await axios.put('/api/diary', { ...data, _id: editingNoteId });
                toast.success('Data Updated!');
                onClose();
                setEditingNoteId(null); // Reset editing note ID
                router.push("/a");
            } else {
                await axios.post('/api/diary', data);
                toast.success('Product Created!');
                onClose();
                router.push("/a");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'An error occurred!');
        } finally {
            setWaiting(false);
        }
    }

    function editNote(id) {
        setEditingNoteId(id);
        handleOpen('opaque');
    }

    if (user.value === null) {
        return null; // Prevent rendering if user data is not yet available
    }




    return (
        <>
            <Head>
                <title>Private Diary | RoboSuperior</title>
                <meta
                    name="description"
                    content="Private Diary helps you securely store your personal notes and keep track of your monthly expenses. Manage your diary entries, monitor your spending habits, and preserve your memories safely."
                />
                <meta
                    name="keywords"
                    content="private diary, personal notes, expense tracker, monthly budget, secure diary, note-taking, spending tracker"
                />
                <meta name="author" content="Private Diary" />
                <meta property="og:title" content="Private Diary | Secure Your Personal Notes & Expenses" />
                <meta
                    property="og:description"
                    content="Record your personal notes, track your monthly expenses, and manage your spending with ease using Private Diary. Your data is securely stored and always accessible."
                />
                <meta property="og:image" content={appLogoUrl} />
                <meta property="og:url" content="https://robosuperior.com" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Private Diary | RoboSuperior" />
                <meta
                    name="twitter:description"
                    content="Keep your notes private and your expenses tracked with Private Diary. An intuitive app designed to secure your memories and budget information."
                />
                <meta name="twitter:image" content={appLogoUrl} />
            </Head>
            <Modal className="dark:!bg-[#1a202c] !shadow-xl" backdrop={"blur"} isDismissable={false} size={"3xl"} isOpen={isOpen} onClose={closeReset}>
                <ModalContent className="rounded-lg shadow-lg bg-white dark:bg-[#1c1c1e]">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className="text-lg font-bold dark:text-gray-200">Make Note</h2>
                            </ModalHeader>
                            <ModalBody className="max-w-3xl w-[48rem]">
                                <form className="p-6 w-[48rem] shadow-md rounded-md">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Select Option</label>
                                        <select
                                            isRequired
                                            className="block w-full p-4 border-gray-300 rounded-md shadow-sm bg-slate-100 dark:border-gray-600 dark:bg-[#2d3748] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6466f1] focus:border-transparent"
                                            value={option}
                                            onChange={(e) => setOption(e.target.value)}
                                        >
                                            <option value="">Select...</option>
                                            <option value="note">Note</option>
                                            <option value="hisab">Hisab</option>
                                        </select>
                                    </div>

                                    {option === 'note' && (
                                        <div className="mb-4 dark:!bg-[#2d3748]">
                                            <Textarea
                                                isRequired
                                                label="Note"
                                                placeholder="Enter your note here..."
                                                value={note}
                                                color="dark:!bg-[#2d3748]"
                                                onChange={(e) => setNote(e.target.value)}
                                                className="dark:text-gray-200 dark:!bg-[#2d3748]"
                                            />
                                        </div>
                                    )}

                                    {option === 'hisab' && (
                                        <>
                                            <div className="mb-4 w-[43rem]">
                                                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Select Option</label>
                                                <Input
                                                    isRequired
                                                    autoFocus
                                                    label="Spend in"
                                                    type="text"
                                                    placeholder="Enter short text..."
                                                    variant="bordered"
                                                    value={reason}
                                                    onChange={(e) => setReason(e.target.value)}
                                                    className="w-[43rem] bg-slate-100 dark:bg-[#2d3748] dark:text-gray-200"
                                                />
                                            </div>
                                            <div className="mb-4 w-[43rem]">
                                                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Select Option</label>
                                                <Input
                                                    isRequired
                                                    label="Cost"
                                                    type="number"
                                                    placeholder="Enter cost..."
                                                    variant="bordered"
                                                    value={cost}
                                                    onChange={(e) => setCost(e.target.value)}
                                                    className="w-[43rem] bg-slate-100 dark:bg-[#2d3748] dark:text-gray-200"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Hisab</label>
                                                <select
                                                    isRequired
                                                    className="block w-full p-4 border-gray-300 rounded-md shadow-sm dark:border-gray-600 bg-slate-100 dark:bg-[#2d3748] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6466f1] focus:border-transparent"
                                                    value={transactionType}
                                                    onChange={(e) => setTransactionType(e.target.value)}
                                                // onChange={handelOparation}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="debit">Debit</option>
                                                    <option value="credit">Credit</option>
                                                    <option value="borrowed">Borrowed</option>
                                                    <option value="lent">Lent</option>
                                                </select>
                                            </div>
                                        </>
                                    )}
                                    <Button type="submit" color="primary" className="mt-4 w-2/2" onClick={createProduct}>
                                        {editingNoteId ? "Update" : "Create"}
                                    </Button>
                                </form>
                            </ModalBody>
                            <ModalFooter className="flex justify-between">

                                <Button color="danger" variant="light" onPress={closeReset} className="w-1/1 mr-2">
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>



            <div className="container !my-16">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2 className="dark:!text-[#6466f1]">Your All<span className="dark:!text-gray-100"> History</span></h2>
                        <h3 className="dark:text-[#6466f1]">ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb dark:text-[#6466f1]" data-aos="fade-left">
                        <BsPostcard className="dark:text-[#6466f1]" /> <span className="dark:text-[#6466f1]">/</span><span className="underline cursor-pointer hover:underline-offset-4 dark:text-[#6466f1]" onClick={handleOpen}>Add Note</span>
                    </div>
                </div>
                <div className="blogstable mt-6">
                    <div className="flex gap-2 mb-4" data-aos="fade-left">
                        <h2 className="dark:text-gray-100">Search Notes: </h2>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`Search by ${searchItem !== "$.1" ? "Note" : "Spend at..."}`}
                            className="dark:text-gray-200 dark:bg-[#2d3748] p-2 rounded-md"
                        />
                        <select
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(Number(e.target.value)); // Update perPage based on dropdown selection
                                setCurrentPage(1); // Reset to first page when perPage changes
                            }}
                            className="dark:!bg-[#2d3748] bg-slate-100 dark:!text-gray-200 !shadow-2xl !px-4 !py-3 !rounded-md !border !border-gray-300 dark:!border-gray-600 hover:!shadow-lg !transition-shadow cursor-pointer !duration-300"
                        >
                            <option className="cursor-pointer" value={5}>5</option>
                            <option className="cursor-pointer" value={10}>10</option>
                            <option className="cursor-pointer" value={15}>15</option>
                            <option className="cursor-pointer" value={20}>20</option>
                            <option className="cursor-pointer" value={50}>50</option>
                        </select>
                        {/* <Select
                            isRequired
                            placeholder="Select search query"
                            defaultSelectedKeys={["All"]}
                            className="max-w-xs py-2"
                            size="lg"
                            color="dark:bg-[#2d3748]"
                            value={searchItem}
                            label='.'
                            onChange={(value) => {
                                setSearchItem(value.target.value);
                            }}
                        >
                            <SelectItem value="all" className="dark:text-gray-200">All</SelectItem>
                            <SelectItem value="note" className="dark:text-gray-200">Amount</SelectItem>
                            <SelectItem value="amount" className="dark:text-gray-200">Note</SelectItem>

                        </Select> */}
                        <select
                            isRequired
                            className="block w-[15rem] p-4 border-gray-300 rounded-md shadow-sm dark:border-gray-600 bg-slate-100 dark:bg-[#2d3748] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6466f1] focus:border-transparent"
                            value={searchItem}
                            onChange={(e) => setSearchItem(e.target.value)}
                        // onChange={handelOparation}
                        >
                            <option value="$.0">All</option>
                            <option value="$.1">Amount</option>
                            <option value="$.2">Note</option>
                        </select>
                        {
                            searchItem === "$.1" ?
                                <>
                                    <select
                                        isRequired
                                        className="block w-[15rem] p-4 border-gray-300 rounded-md shadow-sm dark:border-gray-600 bg-slate-100 dark:bg-[#2d3748] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6466f1] focus:border-transparent"
                                        value={transType}
                                        onChange={(e) => setTransType(e.target.value)}
                                    // onChange={handelOparation}
                                    >
                                        <option value="all">All</option>
                                        <option value="debit">Debit</option>
                                        <option value="credit">Credit</option>
                                        <option value="borrowed">Borrowed</option>
                                        <option value="lent">Lent</option>
                                    </select>

                                </> : ""
                        }

                    </div>

                    <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg dark:bg-[#2d3748]">
                        <thead className="bg-[#6466f1] text-white dark:bg-[#6466f1]">
                            <tr>
                                <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg">#</th>
                                <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg">Type</th>
                                <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg">Transaction Type</th>
                                <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg">Spent at / Reason</th>
                                <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg">Note</th>
                                <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg">Cost</th>
                                <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg">Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 dark:!bg-[#2d3748] dark:!text-gray-100">Loading...</td>
                                </tr>
                            ) : (
                                <>
                                    {currentBlogs.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4 dark:!bg-[#2d3748] dark:!text-gray-100">Nothing.... Create Note</td>
                                        </tr>
                                    ) : (
                                        currentBlogs.map((blog, index) => (
                                            <tr key={blog._id} className="border-b dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200 shadow-lg">
                                                <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200 shadow-lg">{indexOfFirstBlog + index + 1}</td>
                                                <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200 shadow-lg break-words">{blog.note ? "Note" : "Spend"}</td>
                                                <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200 shadow-lg break-words">
                                                    {blog.transactionType
                                                        ? blog.transactionType.charAt(0).toUpperCase() + blog.transactionType.slice(1)
                                                        : ""}
                                                </td>
                                                <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200 shadow-lg break-words">{blog.reason}</td>
                                                <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200 shadow-lg">{blog.note || 'N/A'}</td>
                                                <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200 shadow-lg">{blog.cost || 'N/A'}</td>
                                                {/* <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200 shadow-lg">{blog.status || 'Draft'}</td> */}
                                                <td className="px-4 py-2">
                                                    <div className="flex gap-2">

                                                        <button onClick={() => editNote(blog._id)} className="dark:text-gray-100 dark:bg-[radial-gradient(black,transparent)] dark:hover:!bg-[#424f85] hover:!border-[#38457b]"><FaEdit /> Edit</button>
                                                        <Link href={`/privatenote/delete/${blog._id}`}>
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
                        {searchItem === "$.1"
                            ?
                            <thead thead className="bg-[#6466f1] text-white dark:bg-[#6466f1]">
                                <tr>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg">#</th>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg"></th>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg">Total</th>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg"></th>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg"></th>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg">{totalCost}</th>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200 shadow-lg"></th>
                                </tr>
                            </thead>
                            : ""
                        }

                    </table>

                    {totalFilteredBlogs > 0 && (
                        <div className="blogpagination mt-4 flex justify-center gap-2">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 border rounded-md">Previous</button>
                            {pageNumbers.map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`px-4 py-2 border rounded-md ${currentPage === number ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length} className="px-4 py-2 border rounded-md">Next</button>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
}
