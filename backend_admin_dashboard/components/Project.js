import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';


export default function Project(

    {
        _id,
        title: existingTitle,
        slug: existingSlug,
        description: existingDescription,
        projectcategory: existingProjectcategory,
        tags: existingTags,
        status: existingStatus,
    }

) {



    const [redirect, setRedirect] = useState(false)
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '')
    const [slug, setSlug] = useState(existingSlug || '')
    const [projectcategory, setProjectcategory] = useState(existingProjectcategory || [])
    const [description, setDescription] = useState(existingDescription || '')
    const [tags, setTags] = useState(existingTags || [])
    const [status, setStatus] = useState(existingStatus || '')

    
    async function createProduct(ev) {
        ev.preventDefault();
      

        const data = { title, slug, description, projectcategory, tags, status };

        if (_id) {
            await axios.put('/api/projects', { ...data, _id })
            toast.success('Data Updated!')
        } else {
            await axios.post('/api/projects', data)
            toast.success('Product Created!')
        }

        setRedirect(true);
    };

    

    if (redirect) {
        router.push('/projects')
        return null;
    }


    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        // console.log("Input Value:", inputValue);

        const newSlug = inputValue
            // Replace spaces with hyphens
            .replace(/\s+/g, '-');

        console.log("New Slug:", newSlug);
        setSlug(newSlug);
    };


    return <>


        <form onSubmit={createProduct} className='addWebsiteform'>
            {/* blog title */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="title">Title</label>
                <input type="text" id='title' placeholder='Enter small title'
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            </div>
            {/* blog slug url */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="slug">Slug</label>
                <input type="text" id='slug' placeholder='Enter slug title'
                    value={slug}
                    onChange={handleSlugChange}
                />
            </div>

            {/* blog category */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="catergory">Select Category (ctrl + leftclick for multiple select)</label>
                <select onChange={(e) => setProjectcategory(Array.from(e.target.selectedOptions, option => option.value))} name="catergory" id="catergory" multiple value={projectcategory} >
                    <option value="htmlcssjs">Html, Css & javaScript</option>
                    <option value="nextjs">Next Js, React js</option>
                    <option value="database">Database</option>
                    <option value="deployment">Deployment</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {Array.isArray(existingProjectcategory) && existingProjectcategory.map(category => (
                    <span key={category}>{category}</span>
                ))}</p>
            </div>

            {/* markdown description */}
            <div className='description w-100 flex flex-col flex-left mb-2'>
                <label htmlFor="description">ABOUT PROJECTS</label>
                <MarkdownEditor
                    value={description}
                    onChange={(ev) => setDescription(ev.text)}
                    style={{ width: '100%', height: '400px' }} // You can adjust the height as needed
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
                <label htmlFor="tags">Tags</label>
                <select onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))} name="tags" id="tags" multiple value={tags}>
                    <option value="html">Html</option>
                    <option value="css">css</option>
                    <option value="javascript">javaScript</option>
                    <option value="nextjs">Next Js</option>
                    <option value="reactjs">react Js</option>
                    <option value="database">Database</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {existingTags && existingTags.length > 0 && (
                    <span>{existingTags}</span>
                )}</p>
            </div>

            {/* blog status */}
            <div className='w-100 flex flex-col flex-left mb-2' >
                <label htmlFor="status">Status</label>
                <select onChange={(e) => setStatus(e.target.value)} name="status" id="status" value={status}>
                    <option value="">No Select</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {existingStatus && existingStatus.length > 0 && (
                    <span>{existingStatus}</span>
                )}</p>
            </div>


            <div className='w-100 mb-2'>
                <button type='submit' className='w-100 addwebbtn flex-center'>SAVE PROJECT</button>
            </div>

        </form>

    </>
}

