import { BsTags } from "react-icons/bs";
import { LuClock3 } from "react-icons/lu";
import { AiOutlineDeploymentUnit, AiOutlineUser } from "react-icons/ai";
import { PiMedalFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Head from "next/head";
import { FiDatabase } from "react-icons/fi";
import { TbBrandNextjs } from "react-icons/tb";
import { FaGithub, FaHtml5, FaInstagram, FaTwitter } from "react-icons/fa6";
import RightPortfolioInfo from "@/components/RightPortfolioInfo";
import { RightTopicSection } from "@/components/RightTopicSection";
import Comments from "@/components/Comments";

export default function blogPage() {

    const router = useRouter();
    const { slug } = router.query;
    const [blog, setBlog] = useState(['']);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (slug) { // Check if slug exists
            axios.get(`/api/getblog?slug=${slug}`).then(res => {
                const alldata = res.data;
                setBlog(alldata);
                setLoading(false);
            }).catch(error => {
                console.error("Error fetching blog:", error);
            });
        }
    }, [slug]);

    // function createMarkup(c) {
    //     return { __html: c }
    // }


    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');

        const [copied, setCopied] = useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000); // 3000 milliseconds = 3 seconds
        };

        if (inline) {
            return <code>{children}</code>;
        } else if (match) {
            return (

                <div style={{ position: 'relative' }}>
                    <SyntaxHighlighter
                        style={a11yDark}
                        language={match[1]}
                        PreTag="pre"
                        {...props}
                        codeTagProps={{ style: { padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' } }}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    <button style={{ position: 'absolute', top: '0', borderRadius: '.6rem', right: '0', zIndex: '1', background: '#3d3d3d', color: '#fff', padding: '10px' }} onClick={handleCopy}>
                        {copied ? 'Copied!' : 'Copy code'}
                    </button>
                </div>
            );
        } else {
            return (
                <code className="md-post-code" {...props}>
                    {children}
                </code>
            );
        }
    };


    return <>
        <Head>
            <title>
                {!blog ? 'Loading...' :
                    blog && blog[0] && blog[0].slug ?
                        `${blog[0].slug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} | Robo Superirror` 
                        : 'Loading...'
                }
            </title>
            <meta name="description" content={blog[0].description} />
            

        </Head>

        <div className="slugpage">
            <div className="container">
                <div className="topslug_titles" data-aos="fade-right">
                    <h1 className="slugtitle">{loading ? <div> loading...</div> : blog && blog[0]?.title}</h1>
                    <h5>By <span>RoboSuperior</span>・ Published in <span>{loading ? <div> loading...</div> : blog && blog[0]?.blogcategory}</span> ・   {blog && new Date(blog[0].createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        <span>・ 1 min read</span></h5>
                </div>

                {/* blog data section */}
                <div className="flex flex-sb flex-left pb-5 flex-wrap">
                    <div className="leftblog_data_markdown" data-aos="fade-up">
                        {loading ? <>
                            <div className='wh-100 flex flex-center mt-3'>
                                <div aria-live="assertive" role="alert" className="loader"></div>
                            </div>
                        </> : <>
                            <div className="w-100 blogcontent" >
                                {/* content */}

                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code: Code,
                                    }}
                                >
                                    {blog[0].description}
                                </ReactMarkdown>
                            </div>

                        </>}
                        <Comments slug={slug} />
                    </div>
                    <div className="rightslug_data">
                        <RightPortfolioInfo />
                        <RightTopicSection />
                    </div>
                </div>
            </div>
        </div>
    </>
}





