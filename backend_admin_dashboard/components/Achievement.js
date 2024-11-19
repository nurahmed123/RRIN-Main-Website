import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';


export default function Achievement(

    {
        _id,
        title: existingTitle,
        slug: existingSlug,
        description: existingDescription,
        achievementcategory: existingAachievementcategory,
        tags: existingTags,
        status: existingStatus,
    }

) {



    const [redirect, setRedirect] = useState(false)
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '')
    const [slug, setSlug] = useState(existingSlug || '')
    const [achievementcategory, setAchievementcategory] = useState(existingAachievementcategory || [])
    const [description, setDescription] = useState(existingDescription || '')
    const [tags, setTags] = useState(existingTags || [])
    const [status, setStatus] = useState(existingStatus || '')
    const [loading, setLoading] = useState(false);

    async function createProduct(ev) {
        ev.preventDefault();
        setLoading(true);

        const data = { title, slug, description, achievementcategory, tags, status };
        try {

            if (_id) {
                await axios.put("/api/achievements", { ...data, _id });
                toast.success("Achievements Updated!");
            } else {
                await axios.post("/api/achievements", data);
                toast.success("Achievements Created!");
            }
            setRedirect(true);
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false); // Always set loading to false once the operation is complete
        }
    }

    if (redirect) {
        router.push('/achievements')
        return null;
    }


    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-');
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
                <input required type="text" id='slug' placeholder='Enter slug title'
                    value={slug}
                    onChange={handleSlugChange}
                />
            </div>

            {/* blog category */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="catergory">Select Category (ctrl + leftclick for multiple select)</label>
                <select onChange={(e) => setAchievementcategory(Array.from(e.target.selectedOptions, option => option.value))} name="catergory" id="catergory" multiple value={achievementcategory} >
                    <option value="international">Internatioanl</option>
                    <option value="national">National</option>
                    <option value="regional">Regional</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {Array.isArray(existingAachievementcategory) && existingAachievementcategory.map(category => (
                    <span key={category}>{category}</span>
                ))}</p>
            </div>

            {/* markdown description */}
            <div className='description w-100 flex flex-col flex-left mb-2'>
                <label htmlFor="description">About Achievements</label>
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
                    <option value="nasa conrad challengesa">Nasa Conrad Challenge</option>
                    <option value="nasa">Nasa</option>
                    <option value="competition">Competition</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {existingTags && existingTags.length > 0 && (
                    <span>{existingTags}</span>
                )}</p>
            </div>

            {/* blog status */}
            <div className='w-100 flex flex-col flex-left mb-2' >
                <label htmlFor="status">Status</label>
                <select required onChange={(e) => setStatus(e.target.value)} name="status" id="status" value={status}>
                    <option value="">No Select</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {existingStatus && existingStatus.length > 0 && (
                    <span>{existingStatus}</span>
                )}</p>
            </div>

            <div className='w-100 mb-2'>
                <button
                    type="submit"
                    className={`submit-button ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            {_id ? "Updating..." : 'Creating...'}
                        </div>
                    ) : (
                        _id ? "Update Achievement" : 'Add Achievement'
                    )}
                </button>
            </div>
        </form>
    </>
}

