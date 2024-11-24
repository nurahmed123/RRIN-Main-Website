import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import debounce from 'lodash.debounce';

export default function Blog({
    _id,
    title: existingTitle = '',
    slug: existingSlug = '',
    author: existingAuthor = 'admin',
    description: existingDescription = '',
    blogcategory: existingBlogcategory = [],
    tags: existingTags = [],
    keywords: existingKeywords = '',
    metadescription: existingMetadescription = '',
    primarystatus: existingPrimarystatus = '',
    status: existingStatus = ''
}) {
    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);

    const [blogData, setBlogData] = useState({
        title: existingTitle,
        slug: existingSlug,
        author: existingAuthor,
        description: existingDescription,
        blogcategory: existingBlogcategory,
        tags: existingTags,
        keywords: existingKeywords,
        metadescription: existingMetadescription,
        primarystatus: existingPrimarystatus,
        status: existingStatus
    });

    useEffect(() => {
        if (redirect) {
            router.push('/blogs');
        }
    }, [redirect, router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value });
    };

    const handleSelectChange = (e) => {
        const { name, options } = e.target;
        const values = Array.from(options).filter(option => option.selected).map(option => option.value);
        setBlogData({ ...blogData, [name]: values });
    };

    const handleSlugChange = ((e) => {
        const newSlug = e.replace(/\s+/g, '-');
        setBlogData((prev) => ({ ...prev, slug: newSlug }));
    });

    const handleMarkdownChange = ({ text }) => {
        setBlogData((prev) => ({ ...prev, description: text }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when the form submission begins

        try {
            if (_id) {
                await axios.put('/api/blogs', { ...blogData, _id });
                toast.success('Blog Updated!');
            } else {
                await axios.post('/api/blogs', blogData);
                toast.success('Blog Created!');
            }
            setRedirect(true); // Redirect after successful save
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false); // Always set loading to false once the operation is complete
        }
    };


    return (
        <form onSubmit={handleSubmit} className="addWebsiteform">
            {/* Blog Title */}
            <div className="w-100 flex flex-col flex-left mb-2 aos-init aos-animate">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    value={blogData.title}
                    onChange={handleInputChange}
                />
            </div>

            {/* Blog Slug */}
            <div className="w-100 flex flex-col flex-left mb-2 aos-init aos-animate">
                <label htmlFor="slug">Slug</label>
                <input
                    type="text"
                    id="slug"
                    name="slug"
                    placeholder="Enter slug"
                    value={blogData.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                />
            </div>

            {/* Blog Category */}
            <div className="w-100 flex flex-col flex-left mb-2 aos-init aos-animate">
                <label htmlFor="blogcategory">Select Category</label>
                <select
                    name="blogcategory"
                    id="blogcategory"
                    multiple
                    value={blogData.blogcategory}
                    onChange={handleSelectChange}
                >
                    <option value="htmlcssjs">HTML, CSS & JavaScript</option>
                    <option value="nextjs">Next.js, React.js</option>
                    <option value="database">Database</option>
                    <option value="deployment">Deployment</option>
                </select>
            </div>

            {/* Markdown Description */}
            <div className="w-100 flex flex-col flex-left mb-2 aos-init aos-animate">
                <label htmlFor="description">Blog Content</label>
                <MarkdownEditor
                    value={blogData.description}
                    onChange={handleMarkdownChange}
                    style={{ width: '100%', height: '400px' }}
                    renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
                />
            </div>

            {/* Tags */}
            <div className="w-100 flex flex-col flex-left mb-2 aos-init aos-animate">
                <label htmlFor="tags">Tags</label>
                <select
                    name="tags"
                    id="tags"
                    multiple
                    value={blogData.tags}
                    onChange={handleSelectChange}
                >
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                    <option value="nextjs">Next.js</option>
                    <option value="reactjs">React.js</option>
                    <option value="database">Database</option>
                </select>
            </div>

            {/* Keywords */}
            <div className="w-100 flex flex-col flex-left mb-2 aos-init aos-animate">
                <label htmlFor="keywords">Keywords</label>
                <input
                    type="text"
                    id="keywords"
                    name="keywords"
                    placeholder="Enter keywords"
                    value={blogData.keywords}
                    onChange={handleInputChange}
                />
            </div>

            {/* Meta Description */}
            <div className="w-100 flex flex-col flex-left mb-2 aos-init aos-animate">
                <label htmlFor="metadescription">Meta Description</label>
                <input
                    type="text"
                    id="metadescription"
                    name="metadescription"
                    placeholder="Enter meta description"
                    value={blogData.metadescription}
                    onChange={handleInputChange}
                />
            </div>

            {/* Blog Status */}
            <div className="w-100 flex flex-col flex-left mb-2 aos-init aos-animate">
                <label htmlFor="status">Status</label>
                <select
                    name="status"
                    id="status"
                    value={blogData.status}
                    onChange={handleInputChange}
                >
                    <option value="">No Select</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
            </div>

            {/* Submit Button */}
            <div className="w-100 flex flex-col flex-left mb-2 aos-init aos-animate">
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
                            {_id ? "Updating..." : 'Saving...'}
                        </div>
                    ) : (
                        _id ? "Update Blog" : 'Save Blog'
                    )}
                </button>
            </div>
        </form>
    );
}
