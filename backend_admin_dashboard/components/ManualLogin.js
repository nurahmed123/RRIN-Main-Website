import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import axios from "axios";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"
import Loading from '@/components/Loading';

const ManualLogin = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    

    const [redirect, setRedirect] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // login user check
    const [user, setUser] = useState({ value: null })
    const [key, setKey] = useState(0)

    useEffect(() => {
        try {
            const token = localStorage.getItem("Token")
            if (token) {
                setUser({ value: token })
                setKey(Math.random())
            }
        } catch (err) {
            console.log(err)
            localStorage.clear()
        }
    }, [])

    if (status === "loading") {
        // Loading state, loader or any other indicator
        return <div className='lodingdata flex flex-col flex-center wh_100'>
            <Loading />
            <h1 className='mt-1'>Loading...</h1>
        </div>
    }


    async function userLogin(ev) {
        ev.preventDefault();
        console.log(password)
        const data = { email, password };

        try {

            const resdata = await axios.post('/api/userlogin', data)
            console.log(resdata.data.token)
            localStorage.setItem("Token", resdata.data.token)
            await signIn();
            

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Login success"
            });

            
            
            await router.push('/');
            router.reload()
        } catch {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Invalid Credentials!"
            });
            return
        }

        setRedirect(true);
    };



    if (redirect) {
        router.reload();
        router.push('/')
        return null;
    }

    if (user.value) {
        router.push('/')
        return;
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6  mx-auto ">
                    <div className="w-full bg-white rounded-lg shadow dark:!border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:!border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 rounded-lg">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={userLogin} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input required value={email} onChange={ev => setEmail(ev.target.value)} type="email" name="email" id="email" className="bg-gray-50 !border !border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:!border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:!border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:!border-blue-500" placeholder="name@company.com"/>
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input required value={password} onChange={ev => setPassword(ev.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 !border !border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:!border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:!border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:!border-blue-500"/>
                                </div>
                              
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ManualLogin
