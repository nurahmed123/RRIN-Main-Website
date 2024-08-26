import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function UpdateUserinfo({
    _id,
    name: existingName,
    username: existingUsername,
    role: existingRole,
    email: existingEmail,
    phone: existingPhone,
    country: existingCountry,
    password: existingPassword,
    bio: existingBio,
    facebook: existingFacebook,
    linkedin: existingLinkedin,
    github: existingGithub,
    image: existingImage,
}) {
    const [redirect, setRedirect] = useState(false);
    const [userID, setUserID] = useState(null);
    const router = useRouter();

    const [name, setName] = useState(existingName || '');
    const [username, setUsername] = useState(existingUsername || '');
    const [role, setRole] = useState(existingRole || '');
    const [email, setEmail] = useState(existingEmail || '');
    const [phone, setPhone] = useState(existingPhone || '');
    const [country, setCountry] = useState(existingCountry || '');
    const [password, setPassword] = useState(existingPassword || '');
    const [bio, setBio] = useState(existingBio || '');
    const [facebook, setFacebook] = useState(existingFacebook || '');
    const [linkedin, setLinkedin] = useState(existingLinkedin || '');
    const [github, setGithub] = useState(existingGithub || '');
    const [image, setImage] = useState(existingImage || '');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const checkUser = () => {
            try {
                const token = localStorage.getItem('Token');
                if (token) {
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace('-', '+').replace('_', '/');
                    const JWTData = JSON.parse(window.atob(base64));
                    setUserID(JWTData.data._id);
                } else {
                    router.push('/');
                }
            } catch (err) {
                console.error(err);
                localStorage.clear();
                router.push('/');
            }
        };
        checkUser();
    }, [router]);

    const handleImageChange = (ev) => {
        const file = ev.target.files[0];
        if (file && file.size < 1000000) {
            setImageFile(file);
            setImage(URL.createObjectURL(file)); // Preview the image
        } else {
            toast.error('File size must be less than 1MB');
        }
    };

    const uploadImageToDB = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data.url; // Assuming the backend returns the uploaded image URL
        } catch (err) {
            console.error('Image upload failed:', err);
            toast.error('Image upload failed');
            return null;
        }
    };

    const updateUser = async (ev) => {
        ev.preventDefault();

        let imageUrl = existingImage;
        if (imageFile) {
            imageUrl = await uploadImageToDB(imageFile);
            if (!imageUrl) return; // Stop if the image upload failed
        }

        const data = { name, role, username, country, email, phone, password, image: imageUrl, bio, facebook, github, linkedin };

        try {
            if (_id) {
                await axios.put('/api/createuser', { ...data, _id });
                toast.success('Data Updated!');
            }
            setRedirect(true);
        } catch (err) {
            console.error(err);
            toast.error('An error occurred!');
        }
    };

    if (redirect) {
        router.push('/dashboard');
        return null;
    }

    return (
        <>
            <div className="titledashboard flex flex-sb">
                <div data-aos="fade-right">
                    <h2 className="dark:text-[#6466f1]">Update <span className="dark:text-gray-100">User Profile</span></h2>
                    <h3 className="dark:text-[#6466f1]">ADMIN PANEL</h3>
                </div>
            </div>
            <form onSubmit={updateUser} className='container m-0 lg:!ml-[12rem] addWebsiteform dark:bg-[#2d3748] mt-2'>
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="name" className="dark:text-gray-100">Name</label>
                    <input type="text" id='name' placeholder='Enter name'
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        className="dark:text-gray-200 dark:bg-gray-600"
                    />
                </div>
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="username" className="dark:text-gray-100">User Name</label>
                    <input required type="text" id='username' placeholder='Enter username'
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
                        className="dark:text-gray-200 dark:bg-gray-600"
                    />
                </div>
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="phone" className="dark:text-gray-100">Phone</label>
                    <input type="text" id='phone' placeholder='Enter phone number'
                        value={phone}
                        onChange={ev => setPhone(ev.target.value)}
                        className="dark:text-gray-200 dark:bg-gray-600"
                    />
                </div>
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="country" className="dark:text-gray-100">Country</label>
                    <input type="text" id='country' placeholder='Enter country name'
                        value={country}
                        onChange={ev => setCountry(ev.target.value)}
                        className="dark:text-gray-200 dark:bg-gray-600"
                    />
                </div>
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="bio" className="dark:text-gray-100">Bio</label>
                    <input type="text" id='bio' placeholder='Write about you'
                        value={bio}
                        onChange={ev => setBio(ev.target.value)}
                        className="dark:text-gray-200 dark:bg-gray-600"
                    />
                </div>
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="facebook" className="dark:text-gray-100">Facebook URL</label>
                    <input type="text" id='facebook' placeholder='https://'
                        value={facebook}
                        onChange={ev => setFacebook(ev.target.value)}
                        className="dark:text-gray-200 dark:bg-gray-600"
                    />
                </div>
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="github" className="dark:text-gray-100">Github URL</label>
                    <input type="text" id='github' placeholder='https://'
                        value={github}
                        onChange={ev => setGithub(ev.target.value)}
                        className="dark:text-gray-200 dark:bg-gray-600"
                    />
                </div>
                <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                    <label htmlFor="linkedin" className="dark:text-gray-100">Linkedin URL</label>
                    <input type="text" id='linkedin' placeholder='https://'
                        value={linkedin}
                        onChange={ev => setLinkedin(ev.target.value)}
                        className="dark:text-gray-200 dark:bg-gray-600"
                    />
                </div>
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="fileInput" className="w-full pl-0.5 text-sm">Upload File</label>
                    <input
                        id="fileInput"
                        type="file"
                        accept=".jpg,.png,.jpeg,.webp"
                        onChange={handleImageChange}
                        className="!w-full max-w-md overflow-clip rounded-xl border rounded-lg border-slate-300  text-sm file:mr-4 file:cursor-pointer file:border-none file:bg-slate-100 file:px-4 file:py-2 file:font-medium file:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:focus-visible:outline-blue-600"
                    />
                    <small className="pl-0.5 w-full pb-2">PNG, JPG, WebP - Max 1MB</small>
                </div>
                <div className="mb-1 previewImage">
                    <label htmlFor="fileInput" className="w-full pl-0.5 text-sm">Preview</label>
                    <div className="mt-1 w-full max-w-sm bg-white !border bg-gray-300 !border-gray-200 rounded-[.5rem] shadow">
                        {image ? (
                            <img
                                className="p-8 !rounded"
                                src={image}
                                alt="Upload Image For Preview"
                            />
                        ) : (
                            <p className="pt-5 pl-4">Upload Image For Preview</p>
                        )}
                    </div>
                </div>
                <div className='w-100 mb-2' data-aos="fade-up">
                    <span className="text-sm text-gray-500 dark:text-gray-300">Update </span>
                    <Link href="/passwordreset" className="text-blue-500 hover:text-blue-600">password?</Link>
                </div>
                <div className='w-100 mb-2'>
                    <button type='submit' className='w-100 addwebbtn flex-center dark:bg-[#667eea] dark:hover:bg-[#7788d4]'>Update</button>
                </div>
            </form>
        </>
    );
}
