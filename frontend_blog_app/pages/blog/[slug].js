import { BsTags } from "react-icons/bs";
import { LuClock3 } from "react-icons/lu";
import { AiOutlineDeploymentUnit, AiOutlineUser } from "react-icons/ai";
import { PiMedalFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Head from "next/head";
import { FiDatabase } from "react-icons/fi";
import { TbBrandNextjs } from "react-icons/tb";
import { FaGithub, FaHtml5, FaInstagram, FaTwitter } from "react-icons/fa6";
import RightPortfolioInfo from "@/components/RightPortfolioInfo";
import { RightTopicSection } from "@/components/RightTopicSection";
import Comments from "@/components/Comments";

function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
        return null;
    }

    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
}

export default function BlogPage({ blog }) {
    const router = useRouter();
    const { slug } = router.query;

    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');

        const [copied, setCopied] = useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000);
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

    return (
        <>
            <Head>
                <title>
                    {blog.title ? `${blog.title} | Robo Superior` : 'Loading...'}
                </title>
                <meta name="description" content={blog.description ? blog.description.substring(0, 155) : 'Loading...'} />
                <meta name="keywords" content={`${blog.keywords ? blog.keywords : 'Technology, Robotics, AI, Blogs'}`} />
                <meta name="author" content={blog.author ? blog.author : 'RoboSuperior'} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={blog.title ? `${blog.title} | Robo Superior` : 'Loading...'} />
                <meta property="og:description" content={blog.description ? blog.description.substring(0, 155) : 'Loading...'} />
                <meta property="og:url" content={process.env.SITE_URL} />
                <meta property="og:site_name" content="Robo Superior" />
                <meta property="og:image" content={extractFirstImageUrl(blog.description) || '/img/noimage.jpg'} />
                <meta property="article:published_time" content={blog.createdAt ? new Date(blog.createdAt).toISOString() : ''} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@RoboSuperior" />
                <meta name="twitter:title" content={blog.title} />
                <meta name="twitter:description" content={blog.description} />
                <meta name="twitter:image" content={extractFirstImageUrl(blog.description) || '/img/noimage.jpg'} />

                <link rel="canonical" href={`${process.env.SITE_URL}/${slug}`} />

                <script type="application/ld+json">
                    {`{
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${process.env.SITE_URL}/${slug}"
                        },
                        "headline": "${blog.title}",
                        "description": "${blog.description}",
                        "image": "${blog.imageUrl || '/default-image.png'}",
                        "author": {
                            "@type": "Organization",
                            "name": "Robo Superior"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Robo Superior",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "/logo.png"
                            }
                        },
                        "datePublished": "${blog.createdAt ? new Date(blog.createdAt).toISOString() : ''}"
                    }`}
                </script>
            </Head>

            <div className="slugpage">
                <div className="container">
                    <div className="topslug_titles" data-aos="fade-right">
                        <h1 className="slugtitle">{blog?.title}</h1>
                        <h5>By <span>RoboSuperior</span>・ Published in <span>{blog?.blogcategory}</span> ・ {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            <span>・ 1 min read</span></h5>
                    </div>

                    <div className="flex flex-sb flex-left pb-5 flex-wrap">
                        <div className="leftblog_data_markdown" data-aos="fade-up">
                            <div className="w-100 blogcontent">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code: Code,
                                    }}
                                >
                                    {blog.description}
                                </ReactMarkdown>
                            </div>
                            <Comments slug={slug} />
                        </div>
                        <div className="rightslug_data">
                            <RightPortfolioInfo />
                            <RightTopicSection />

                            <div className="related-posts">
                                <h2>Related Articles</h2>
                                <ul>
                                    <li><Link href="/blog/post1">How AI is Revolutionizing Robotics</Link></li>
                                    <li><Link href="/blog/post2">Top 10 Robotic Innovations of 2024</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const res = await axios.get(`/api/getblog?slug=${slug}`);
    const alldata = res.data;

    return {
        props: {
            blog: alldata[0],
        },
    };
}
