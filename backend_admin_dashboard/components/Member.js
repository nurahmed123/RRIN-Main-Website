import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Image from "next/image";

export default function Project({
    _id,
    name: existingName,
    image: existingImage,
    role: existingRole,
    phone: existingPhone,
    email: existingEmail,
    linkedin: existingLinkedin,
    github: existingGithub,
    facebook: existingFacebook,
    instagram: existingInstagram,
    twitter: existingTwitter,
    youtube: existingYoutube,
    status: existingStatus,
}) {
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [name, setName] = useState(existingName || "");
    const [role, setRole] = useState(existingRole || "");
    const [phone, setPhone] = useState(existingPhone || []);
    const [email, setEmail] = useState(existingEmail || "");
    const [linkedin, setLinkedin] = useState(existingLinkedin || []);
    const [github, setGithub] = useState(existingGithub || "");
    const [facebook, setFacebook] = useState(existingFacebook || "");
    const [twitter, setTwitter] = useState(existingTwitter || "");
    const [youtube, setYoutube] = useState(existingYoutube || "");
    const [instagram, setInstagram] = useState(existingInstagram || "");
    const [status, setStatus] = useState(existingStatus || "");
    const [image, setImage] = useState(existingImage || "");

    const [fileSize, setFileSize] = useState();
    const [loading, setLoading] = useState(false);

    async function createProduct(ev) {
        ev.preventDefault();
        setLoading(true);

        const data = {
            name,
            role,
            phone,
            email,
            linkedin,
            github,
            facebook,
            instagram,
            youtube,
            twitter,
            status,
            image,
        };
        try {

            if (_id) {
                await axios.put("/api/members", { ...data, _id });
                toast.success("Data Updated!");
            } else {
                await axios.post("/api/members", data);
                toast.success("Product Created!");
            }
            setRedirect(true);
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false); // Always set loading to false once the operation is complete
        }
    }

    if (redirect) {
        router.push("/members");
        return null;
    }

    const handleImgUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        // console.log(file.size);
        // setImage({ ...image, memberImage: base64 })
        setFileSize(file.size);
        {
            file.size >= 1000000 ? null : setImage(base64);
        }
    };

    return (
        <>
            <form onSubmit={createProduct} className="addWebsiteform">
                {/* blog title */}
                <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
                    <label htmlFor="title">Full Name</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                    />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
                    <label htmlFor="title">Your Role</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter your role"
                        value={role}
                        onChange={(ev) => setRole(ev.target.value)}
                    />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
                    <label htmlFor="title">Email</label>
                    <input
                        type="email"
                        id="title"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
                    <label htmlFor="title">Phone</label>
                    <input
                        type="number"
                        id="title"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(ev) => setPhone(ev.target.value)}
                    />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
                    <label htmlFor="title">Linkedin</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter LinkedIn profile"
                        value={linkedin}
                        onChange={(ev) => setLinkedin(ev.target.value)}
                    />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
                    <label htmlFor="title">Github</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter Github profile"
                        value={github}
                        onChange={(ev) => setGithub(ev.target.value)}
                    />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
                    <label htmlFor="title">Facebook</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter Facebook profile"
                        value={facebook}
                        onChange={(ev) => setFacebook(ev.target.value)}
                    />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
                    <label htmlFor="title">Instagram</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter Instagram profile"
                        value={instagram}
                        onChange={(ev) => setInstagram(ev.target.value)}
                    />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
                    <label htmlFor="title">Twitter</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter Twitter profile"
                        value={twitter}
                        onChange={(ev) => setTwitter(ev.target.value)}
                    />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
                    <label htmlFor="title">Youtube</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter Youtube profile"
                        value={youtube}
                        onChange={(ev) => setYoutube(ev.target.value)}
                    />
                </div>

                {/* <div className="flex items-center justify-center w-full">
                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div> */}
                {/* <div className="relative flex w-full max-w-sm flex-col gap-1 text-slate-700 "> */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="fileInput" className="w-full pl-0.5 text-sm">
                        Upload File
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept=".jpg,.png,.jpeg,.webp"
                        onChange={(e) => handleImgUpload(e)}
                        className="!w-full max-w-md overflow-clip rounded-xl border rounded-lg border-slate-300  text-sm file:mr-4 file:cursor-pointer file:border-none file:bg-slate-100 file:px-4 file:py-2 file:font-medium file:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:focus-visible:outline-blue-600"
                    />
                    <small className="pl-0.5 w-full pb-2">PNG, JPG, WebP - Max 1MB</small>
                </div>

                <div className="mb-1 previewImage">
                    <label htmlFor="fileInput" className="w-full pl-0.5 text-sm">
                        Preview
                    </label>
                    <div className="mt-1 w-full max-w-sm bg-white !border bg-gray-300 !border-gray-200 rounded-[.5rem] shadow ">
                        {image ? (
                            <img
                                className="p-8 !rounded"
                                src={image}
                                alt="Upload Image For Preview"
                            />
                        ) : (
                            <p className="pt-5 pl-4">Upload Image For Preview</p>
                        )}
                        {fileSize >= 1000000 ? (
                            <p style={{ color: "red" }} className="pt-5 pl-4">
                                File size is longer than 1MB
                            </p>
                        ) : null}

                        <div className="px-5 pb-5">
                            {/* <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                    </a> */}
                        </div>
                    </div>
                </div>

                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="status">Status</label>
                    <select
                        required
                        onChange={(e) => setStatus(e.target.value)}
                        name="status"
                        id="status"
                        value={status}
                    >
                        <option value="">No Select</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <p className="existingcategory flex gap-1 mt-1 mb-1">
                        Selected:{" "}
                        {existingStatus && existingStatus.length > 0 && (
                            <span>{existingStatus}</span>
                        )}
                    </p>
                </div>

                {/* blog slug url */}
                {/* <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="slug">Slug</label>
                <input type="text" id='slug' placeholder='Enter slug title'
                    value={slug}
                    onChange={handleSlugChange}
                />
            </div> */}

                {/* blog category */}
                {/* <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
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
            </div> */}

                {/* markdown description */}
                {/* <div className='description w-100 flex flex-col flex-left mb-2'>
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
            </div> */}

                {/* tags */}
                {/* <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
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
            </div> */}

                {/* blog status */}
                {/* <div className='w-100 flex flex-col flex-left mb-2' >
                <label htmlFor="status">Status</label>
                <select onChange={(e) => setStatus(e.target.value)} name="status" id="status" value={status}>
                    <option value="">No Select</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">Selected: {existingStatus && existingStatus.length > 0 && (
                    <span>{existingStatus}</span>
                )}</p>
            </div> */}

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
                            Adding...
                        </div>
                    ) : (
                        'Add Member'
                    )}
                </button>
            </div>
            </form>
        </>
    );
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}
