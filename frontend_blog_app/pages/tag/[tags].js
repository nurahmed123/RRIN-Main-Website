import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

function extractFirstImageUrl(markdownContent) {
    // Check if markdownContent is provided and non-empty
    if (!markdownContent || typeof markdownContent !== 'string') {
        return null;
    }

    // Regular expression to match the first image URL in markdown format ![alt text](imageURL)
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
}


export default function Tagscategory() {

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(4);
    const [blog, setBlog] = useState([]);
    const router = useRouter();
    const { tags } = router.query;

    useEffect(() => {
        // Function to fetch blog data
        const fetchBlogData = async () => {
            try {
                const res = await axios.get(`/api/getblog?tags=${tags}`);
                const alldata = res.data;
                setBlog(alldata);
                setLoading(false); // Set loading state to false after data is fetched
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setLoading(false); // Set loading state to false even if there's an error
            }
        };

        // Fetch blog data only if tags exist
        if (tags) {
            fetchBlogData();
        }
    }, [tags, router]);


    // filter published blogs
    const publishedblogs = blog.filter(ab => ab.status === 'publish');


    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * perPage;
    const indexOfFirstProduct = indexOfLastProduct - perPage;
    const currentProducts = blog.slice(indexOfFirstProduct, indexOfLastProduct);

    const alldata = blog.length; // Total number of products

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(alldata / perPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div className="blogpage">
            {tags ? (
                <div className="category_slug">
                    <div className="container">
                        <div className="category_title">
                            <div className="flex gap-1" data-aos="fade-right">
                                <h1>{tags}</h1>
                                <span>{publishedblogs.filter(blog => blog.tags.includes(tags)).length}</span>
                            </div>
                            <p data-aos="fade-left">Nothing To Preview</p>
                        </div>
                        <div className="category_blogs mt-3">
                            {loading ? <><div className="wh-100 flex flex-center mt-2 pb-5">
                                <div aria-live="assertive" role="alert" className="loader"></div></div></> : <>
                                {publishedblogs.map((item) => {
                                    // in the markdown content first image show here
                                    const firstImageUrl = extractFirstImageUrl(item.description);
                                    // Check if the current blog item includes the tag
                                    const includesTag = item.tags.includes(tags);
                                    if (includesTag) {
                                        return <div className="cate_blog" key={item._id} data-aos="fade-up">
                                            <Link href={`/blog/${item.slug}`}><img src={firstImageUrl || "/img/noimage.jpg"} alt="blog" /></Link>
                                            <div className="bloginfo mt-2">
                                                <Link href={`/tag/${item.tags[0]}`}><div className="blogtag">{item.tags[0]}</div></Link>
                                                <Link href={`/blog/${item.slug}`}><h3>{item.title}</h3></Link>
                                                <p>Markdown is a lightweight markup language with plain-text-formatting syntax. Its design allows it to…</p>
                                                <div className="blogauthor flex gap-1">
                                                    <div className="blogaimg">
                                                        <img src="/img/coder.png" alt="author" />
                                                    </div>
                                                    <div className="flex flex-col flex-left gap-05">
                                                        <h4>RoboSuperior</h4>
                                                        <span>{new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                })}</>
                            }
                        </div>
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
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentProducts.length < perPage}>Next</button>
                        </div>
                    </div>
                </div>
            ) : <><h1 className="flex flex-center wh_100">No Tag Found 404</h1></>}
        </div >


    )
}

