import Head from "next/head";
import Link from "next/link";
import { FaHtml5 } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";
import GalleryView from "@/components/GalleryView";
import { RightAchievementTopicSection } from "@/components/RightAchievementTopicSection";

function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== 'string') {
        return null;
    }

    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
}

export default function Achievement() {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);
    const { alldata, loading } = useFetchData(`/api/getachievement`);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastblog = currentPage * perPage;
    const indexOfFirstblog = indexOfLastblog - perPage;
    const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

    const allblog = alldata.length;

    const publishedblogs = currentBlogs.filter(ab => ab.status === "publish")

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <Head>
                <title>Achievements | RoboSuperior</title>
                <meta name="description" content="Explore recent achievements and milestones of RoboSuperior. Check out our latest projects and successes." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                {/* Open Graph meta tags */}
                <meta property="og:title" content="Achievements | RoboSuperior" />
                <meta property="og:description" content="Explore recent achievements and milestones of RoboSuperior. Check out our latest projects and successes." />
                <meta property="og:image" content="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600" />
                <meta property="og:url" content={`${process.env.SITE_URL}/achievements`} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="RoboSuperior" />
                
                {/* Twitter Card meta tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Achievements | RoboSuperior" />
                <meta name="twitter:description" content="Explore recent achievements and milestones of RoboSuperior. Check out our latest projects and successes." />
                <meta name="twitter:image" content="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600" />
                <meta name="twitter:site" content="@robo_superior" />
            </Head>

            <GalleryView img4text="demo t" img4url="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600" img3text="text" img3url="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=1000" img2text="demo" img2url="https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&q=75&fit=crop&w=1000" img1text="Nasa" img1url="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600" headline="Recent Achievements" description="Here is our few memories...." />

            <section className="main_blog_section">
                <div className="container flex flex-sb flex-left flex-wrap">
                    <div className="leftblog_sec">
                        <h2>Recent Achievement</h2>
                        <div className="blogs_sec">
                            {loading ? <><div className="wh-100 flex flex-center mt-2 pb-5">
                                <div aria-live="assertive" role="alert" className="loader"></div></div></> : <>
                                {publishedblogs.map((blog) => {
                                    const firstImageUrl = extractFirstImageUrl(blog.description);
                                    return <div className="blog" key={blog._id} data-aos="fade-up">
                                        <div className="blogimg">
                                            <Link href={`/achievement/${blog.slug}`}>
                                                <img src={firstImageUrl || "/img/noimage.jpg"} alt="blog" />
                                            </Link>
                                        </div>
                                        <div className="bloginfo">
                                            <Link href={`/tag/${blog.tags[0]}`}><div className="blogtag">{blog.tags[0]}</div></Link>
                                            <Link href={`/achievement/${blog.slug}`}><h3>{blog.title}</h3></Link>
                                            <p>Markdown is a lightweight markup language with plain-text-formatting syntax. Its design allows it to…</p>
                                            <div className="blogauthor flex gap-1">
                                                <div className="blogaimg">
                                                    <img src="/img/coder.png" alt="author" />
                                                </div>
                                                <div className="flex flex-col flex-left gap-05">
                                                    <h4>RoboSuperior</h4>
                                                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}

                            </>}


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
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                        </div>
                    </div>
                    <div className="rightblog_info">
                        <RightAchievementTopicSection />
                        <div className="tags_sec mt-3">
                            <h2>Tags</h2>
                            <div className="tags_list" data-aos="fade-up">
                                <Link href='/tag/html'>#html</Link>
                                <Link href='/tag/css'>#css</Link>
                                <Link href='/tag/javascript'>#javaScript</Link>
                                <Link href='/tag/nextjs'>#nextjs</Link>
                                <Link href='/tag/reactjs'>#reactjs</Link>
                                <Link href='/tag/database'>#database</Link>
                            </div>
                        </div>
                        <div className="letstalk_sec mt-3">
                            <h2>Let's Talk</h2>
                            <div className="talk_sec">
                                <h4>Want to find out how I can solve problems specific to your business? Let's talk.</h4>
                                <div className="social_talks flex flex-center gap-1 mt-2">
                                    <div className="st_icon" data-aos="fade-up">
                                        <Link href={"https:github.com/nurahmed123"} target="_blank"><FaGithub /></Link>
                                    </div>
                                    <div className="st_icon" data-aos="fade-up">
                                        <Link href={"https://x.com/robo_superior"} target="_blank"><FaTwitter /></Link>
                                    </div>
                                    <div className="st_icon" data-aos="fade-up">
                                        <Link href={"https:linkedin.com/in/06nurahmed"} target="_blank"> <FaLinkedinIn /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
