import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Updateuserinfo({
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

    const [userData, setUserData] = useState({
        name: existingName || '',
        username: existingUsername || '',
        role: existingRole || '',
        email: existingEmail || '',
        phone: existingPhone || '',
        country: existingCountry || '',
        password: existingPassword || '',
        bio: existingBio || '',
        facebook: existingFacebook || '',
        linkedin: existingLinkedin || '',
        github: existingGithub || '',
        image: existingImage || '',
    });

    const [file, setFile] = useState(null);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.url;
        }
        return userData.image;
    };

    const updateUser = async (ev) => {
        ev.preventDefault();

        const imageUrl = await uploadImage();
        const updatedData = { ...userData, image: imageUrl };

        try {
            if (_id) {
                await axios.put('/api/createuser', { ...updatedData, _id });
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
            <form onSubmit={updateUser} className="container m-0 lg:!ml-[12rem] addWebsiteform dark:bg-[#2d3748] mt-2">
                {['name', 'username', 'phone', 'country', 'bio', 'facebook', 'linkedin', 'github'].map((field) => (
                    <div key={field} className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
                        <label htmlFor={field} className="dark:text-gray-100">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            placeholder={`Enter ${field}`}
                            value={userData[field]}
                            onChange={handleInputChange}
                            className="dark:text-gray-200 dark:bg-gray-600"
                        />
                    </div>
                ))}

                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="fileInput" className="w-full pl-0.5 text-sm">Upload File</label>
                    <input
                        id="fileInput"
                        type="file"
                        accept=".jpg,.png,.jpeg,.webp"
                        onChange={handleFileChange}
                        className="!w-full max-w-md overflow-clip rounded-xl border rounded-lg border-slate-300 text-sm file:mr-4 file:cursor-pointer file:border-none file:bg-slate-100 file:px-4 file:py-2 file:font-medium file:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:focus-visible:outline-blue-600"
                    />
                    <small className="pl-0.5 w-full pb-2">PNG, JPG, WebP - Max 1MB</small>
                </div>

                <div className="mb-1 previewImage">
                    <label htmlFor="fileInput" className="w-full pl-0.5 text-sm">Preview</label>
                    <div className="mt-1 w-full max-w-sm bg-white !border bg-gray-300 !border-gray-200 rounded-[.5rem] shadow">
                        {userData.image ? (
                            <img
                                className="p-8 !rounded"
                                src={userData.image}
                                alt="Upload Image For Preview"
                            />
                        ) : (
                            <p className="pt-5 pl-4">Upload Image For Preview</p>
                        )}
                    </div>
                </div>

                <div className="w-100 mb-2" data-aos="fade-up">
                    <span className="text-sm text-gray-500 dark:text-gray-300">Update </span>
                    <Link href="/passwordreset" className="text-blue-500 hover:text-blue-600">password?</Link>
                </div>

                <div className="w-100 mb-2">
                    <button type="submit" className="w-100 addwebbtn flex-center dark:bg-[#667eea] dark:hover:bg-[#7788d4]">Update</button>
                </div>
            </form>
        </>
    );
}
