import Head from "next/head";
import Link from "next/link";
import { FaHtml5, FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { useState, useEffect } from "react";

function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
        return null;
    }
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
}

export default function Blog() {
    const LogoImage = `https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/37b0a981-7d1e-4c79-ae16-47d31e4be6fa.png`;
    const [allBlogs, setAllBlogs] = useState([]);
    const [displayedBlogs, setDisplayedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [perPage] = useState(5);
    const [currentCount, setCurrentCount] = useState(0);

    // Fetch all blogs on component mount
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(`/api/getblog`);
            const data = await response.json();
            setAllBlogs(data);
            setLoading(false);
            // Filter for published blogs
            const publishedBlogs = data.filter((blog) => blog.status === "publish");
            setDisplayedBlogs(publishedBlogs.slice(0, perPage)); // Show initial blogs
            setCurrentCount(perPage); // Set the current count to the number of blogs displayed
        };

        fetchBlogs();
    }, []);

    // Load more blogs on button click
    const loadMoreBlogs = () => {
        const nextCount = currentCount + perPage;
        setDisplayedBlogs((prev) => [
            ...prev,
            ...allBlogs.filter((blog) => blog.status === "publish").slice(currentCount, nextCount),
        ]);
        setCurrentCount(nextCount);
    };

    return (
        <>
            <Head>
                <title>Blogs | RoboSuperior</title>
                <meta
                    name="description"
                    content="Stay updated with the latest articles on web development, including Next.js, React, HTML, CSS, JavaScript, and more."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Blogs | RoboSuperior" />
                <meta
                    property="og:description"
                    content="Stay updated with the latest articles on web development, including Next.js, React, HTML, CSS, JavaScript, and more."
                />
                <meta property="og:url" content={`${process.env.SITE_URL}/blog`} />
                <meta property="og:image" content="/img/blog.png" />
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Blogs | RoboSuperior" />
                <meta
                    name="twitter:description"
                    content="Stay updated with the latest articles on web development, including Next.js, React, HTML, CSS, JavaScript, and more."
                />
                <meta name="twitter:image" content="/img/blog.png" />
            </Head>

            <section className="main_blog_section">
                <div className="container flex flex-sb flex-left flex-wrap">
                    <div className="leftblog_sec">
                        <h2>Recently Published</h2>
                        <div className="blogs_sec">
                            {loading ? (
                                <div className="wh-100 flex flex-center mt-2 pb-5">
                                    <div aria-live="assertive" role="alert" className="loader"></div>
                                </div>
                            ) : (
                                displayedBlogs.map((blog) => {
                                    const firstImageUrl = extractFirstImageUrl(blog.description);
                                    return (
                                        <div className="blog" key={blog._id}>
                                            <div className="blogimg">
                                                <Link href={`/blog/${blog.slug}`}>
                                                    <img
                                                        src={firstImageUrl || "/img/noimage.jpg"}
                                                        alt="blog"
                                                        className="transition-transform hover:scale-105 duration-300 ease-in-out"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="bloginfo">
                                                <Link href={`/tag/${blog.tags[0]}`}>
                                                    <div className="blogtag">{blog.tags[0]}</div>
                                                </Link>
                                                <Link href={`/blog/${blog.slug}`}>
                                                    <h3>{blog.title}</h3>
                                                </Link>
                                                <p>{blog.metadescription}</p>
                                                <div className="blogauthor flex gap-1">
                                                    <div className="blogaimg">
                                                        <img src={LogoImage} alt="author" />
                                                    </div>
                                                    <div className="flex flex-col flex-left gap-05">
                                                        <h4>RoboSuperior</h4>
                                                        <span>
                                                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                                                month: "long",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        <div className="blogpagination flex justify-center mt-4">
                            {currentCount < allBlogs.filter((blog) => blog.status === "publish").length && (
                                <button onClick={loadMoreBlogs} >
                                    Load More
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="rightblog_info">
                        <div className="topics_sec">
                            <h2>Topics</h2>
                            <div className="topics_list">
                                <Link href="/topics/htmlcssjs" data-aos="fade-up">
                                    <div className="topics">
                                        <div className="flex flex-center topics_svg">
                                            <FaHtml5 />
                                        </div>
                                        <h3>Html, css & javaScript</h3>
                                    </div>
                                </Link>
                                <Link href="/topics/nextjs">
                                    <div className="topics">
                                        <div className="flex flex-center topics_svg">
                                            <TbBrandNextjs />
                                        </div>
                                        <h3>Next Js, React js</h3>
                                    </div>
                                </Link>
                                <Link href="/topics/database" data-aos="fade-up">
                                    <div className="topics">
                                        <div className="flex flex-center topics_svg">
                                            <FiDatabase />
                                        </div>
                                        <h3>DataBase</h3>
                                    </div>
                                </Link>
                                <Link href="/topics/deployment" data-aos="fade-up">
                                    <div className="topics">
                                        <div className="flex flex-center topics_svg">
                                            <AiOutlineDeploymentUnit />
                                        </div>
                                        <h3>Deployment</h3>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="tags_sec mt-3">
                            <h2>Tags</h2>
                            <div className="tags_list" data-aos="fade-up">
                                <Link href="/tag/html">#html</Link>
                                <Link href="/tag/css">#css</Link>
                                <Link href="/tag/javascript">#javaScript</Link>
                                <Link href="/tag/nextjs">#nextjs</Link>
                                <Link href="/tag/reactjs">#reactjs</Link>
                                <Link href="/tag/database">#database</Link>
                            </div>
                        </div>
                        <div className="letstalk_sec mt-3">
                            <h2>Let's Talk</h2>
                            <div className="talk_sec">
                                <h4>
                                We're here for you—get in touch, and let's make it happen!
                                </h4>
                                <div className="social_talks flex flex-center gap-1 mt-2">
                                    <Link href={"https://github.com/RoboSuperior"} target="_blank">
                                        <FaGithub />
                                    </Link>
                                    <Link href={"https://twitter.com/RoboSuperior"} target="_blank">
                                        <FaTwitter />
                                    </Link>
                                    <Link href={"https://www.linkedin.com/company/robosuperior"} target="_blank">
                                        <FaLinkedinIn />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
