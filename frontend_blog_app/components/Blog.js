import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';


export default function Blog(

    {
        _id,
        title: existingTitle,
        slug: existingSlug,
        author: existingAuthor,
        description: existingDescription,
        blogcategory: existingBlogcategory,
        tags: existingTags,
        keywords: existingKeywords,
        metadescription: existingMetadescription,
        primarystatus: existingPrimarystatus,
        status: existingStatus,
    }

) {


    // login user check
    const [user, setUser] = useState({ value: null })
    const [redirect, setRedirect] = useState(false)
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '')
    const [slug, setSlug] = useState(existingSlug || '')
    const [author, setAuthor] = useState(existingAuthor || '')
    const [blogcategory, setBlogcategory] = useState(existingBlogcategory || [])
    const [description, setDescription] = useState(existingDescription || '')
    const [tags, setTags] = useState(existingTags || [])
    const [keywords, setKeywords] = useState(existingKeywords || [])
    const [metadescription, setmetadescription] = useState(existingMetadescription || [])
    const [primarystatus, setPrimarystatus] = useState(existingPrimarystatus || '')
    const [status, setStatus] = useState(existingStatus || '')

    useEffect(() => {
        const checkUser = () => {
            try {
                const token = localStorage.getItem("Token")
                if (token) {

                    if (!user.value) { return; }
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace('-', '+').replace('_', '/');
                    const JWTData = JSON.parse(window.atob(base64))
                    setAuthor(JWTData.data._id)
                    console.log(author)
                } else {
                    router.push('/'); // Redirect if no token is found
                }
            } catch (err) {
                console.log(err)
                localStorage.clear()
                router.push('/'); // Redirect on error
            }
        }
        checkUser();
    }, [router])


    async function createProduct(ev) {
        ev.preventDefault();

        // try {
        //     const token = localStorage.getItem("Token")
        //     if (token) {

        //         if (!user.value) { return; }
        //         const base64Url = token.split('.')[1];
        //         const base64 = base64Url.replace('-', '+').replace('_', '/');
        //         const JWTData = JSON.parse(window.atob(base64))
        //         setAuthor(JWTData.data._id)
        //         console.log(author)
        //     }else {
        //         router.push('/'); // Redirect if no token is found
        //       }
        // } catch (err) {
        //     console.log(err)
        //     localStorage.clear()
        // }
        // console.log(author)

        const data = { title, slug, author, description, blogcategory, tags, keywords, metadescription, primarystatus, status };

        if (_id) {
            await axios.put('/api/blogs', { ...data, _id })
            toast.success('Data Updated!')
        } else {
            await axios.post('/api/blogs', data)
            toast.success('Product Created!')
        }

        setRedirect(true);
    };



    if (redirect) {
        router.push('/dashboard/blogs')
        return null;
    }


    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        // console.log("Input Value:", inputValue);

        const newSlug = inputValue
            // Replace spaces with hyphens
            .replace(/\s+/g, '-');

        // console.log("New Slug:", newSlug);
        setSlug(newSlug);
    };

    // Early return or loading state if necessary
    if (user.value === null) {
        return null; // You can also show a loading spinner or placeholder here
    }

    if (user.value !== null) {
        return <>


            <form onSubmit={createProduct} className='addWebsiteform dark:bg-[#2d3748] mt-2'>
                {/* blog title */}
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="title" className="dark:text-gray-100">Title</label>
                    <input type="text" id='title' placeholder='Enter small title'
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                        className="dark:text-gray-200 dark:bg-gray-600"
                    />
                </div>
                {/* blog slug url */}
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="slug" className="dark:text-gray-100">Slug</label>
                    <input required type="text" id='slug' placeholder='Enter slug title'
                        value={slug}
                        onChange={handleSlugChange}
                        className="dark:text-gray-200 dark:bg-gray-600"
                    />
                </div>

                {/* blog category */}
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="catergory" className="dark:text-gray-100">Select Category (ctrl + leftclick for multiple select)</label>
                    <select className="dark:bg-gray-600 dark:text-gray-200" onChange={(e) => setBlogcategory(Array.from(e.target.selectedOptions, option => option.value))} name="catergory" id="catergory" multiple value={blogcategory} >
                        <option value="htmlcssjs">Html, Css & javaScript</option>
                        <option value="nextjs">Next Js, React js</option>
                        <option value="database">Database</option>
                        <option value="deployment">Deployment</option>
                    </select>
                    <p className="existingcategory flex gap-1 mt-1 mb-1 dark:text-gray-100">Selected: {Array.isArray(existingBlogcategory) && existingBlogcategory.map(category => (
                        <span key={category}>{category}</span>
                    ))}</p>
                </div>

                {/* markdown description */}
                <div className='description w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor="description" className="dark:text-gray-100" >Blog Content</label>
                    <MarkdownEditor
                        value={description}
                        onChange={(ev) => setDescription(ev.text)}
                        style={{ width: '100%', height: '400px' }} // You can adjust the height as needed
                        // className="dark:bg-gray-600"
                        renderHTML={(text) => (
                            <ReactMarkdown components={{
                                code: ({ node, inline, className, children, ...props }) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    if (inline) {
                                        return <code>{children}</code>;
                                    } else if (match) {
                                        return (
                                            <div style={{ position: 'relative' }}>
                                                <pre style={{ padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' }} {...props}>
                                                    <code >{children}</code>
                                                </pre>
                                                <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }} onClick={() => navigator.clipboard.writeText(children)}>
                                                    Copy code
                                                </button>
                                            </div>
                                        );
                                    } else {
                                        return <code {...props}>{children}</code>;
                                    }
                                },
                            }}>
                                {text}
                            </ReactMarkdown>
                        )}
                    />
                </div>

                {/* tags */}
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="tags" className="dark:text-gray-100">Tags</label>
                    <select className="dark:bg-gray-600 dark:text-gray-200" onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))} name="tags" id="tags" multiple value={tags}>
                        <option value="html">Html</option>
                        <option value="css">css</option>
                        <option value="javascript">javaScript</option>
                        <option value="nextjs">Next Js</option>
                        <option value="reactjs">react Js</option>
                        <option value="database">Database</option>
                    </select>
                    <p className="existingcategory flex gap-1 mt-1 mb-1 dark:text-gray-100">Selected: {existingTags && existingTags.length > 0 && (
                        <span>{existingTags}</span>
                    )}</p>
                </div>

                {/* blog keyword */}
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="title" className="dark:text-gray-100">Keyword</label>
                    <input type="text" id='keyword' placeholder='Enter keywords'
                        value={keywords}
                        onChange={ev => setKeywords(ev.target.value)}
                        className="dark:text-gray-200 dark:bg-gray-600"
                    />
                </div>

                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="metadescription" className="dark:text-gray-100">Meta Descripstion</label>
                    <input type="text" id='metadescription' placeholder='Enter Meta Desription'
                        value={metadescription}
                        onChange={ev => setmetadescription(ev.target.value)}
                        className="dark:text-gray-200 dark:bg-gray-600"
                    />
                </div>

                {/* blog status */}
                <div className='w-100 flex flex-col flex-left mb-2' >
                    <label htmlFor="status" className="dark:text-gray-100">Status</label>
                    <select className="dark:bg-gray-600 dark:text-gray-200" required onChange={(e) => setPrimarystatus(e.target.value)} name="status" id="status" value={primarystatus}>
                        <option value="">No Select</option>
                        {/* <option value="userdraft">Draft</option> */}
                        <option value="publish">Publish</option>
                    </select>
                    <p className="existingcategory flex gap-1 mt-1 mb-1 dark:text-gray-100">Selected: {existingStatus && existingStatus.length > 0 && (
                        <span>{existingStatus}</span>
                    )}</p>
                </div>


                <div className='w-100 mb-2'>
                    <button type='submit' className='w-100 addwebbtn flex-center dark:bg-[#667eea] dark:hover:bg-[#7788d4]'>SAVE BLOG</button>
                </div>

            </form>

        </>
    }
}
