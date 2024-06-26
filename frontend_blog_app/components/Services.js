import React, { useEffect, useState } from 'react'


const Services = () => {
    const [darkMode, setDarkMode] = useState(true);
    useEffect(() => {
        // Check local storage for dark mode preference on initial load
        const isDarkMode = localStorage.getItem('darkMode');
        setDarkMode(isDarkMode);
    }, [darkMode]);

    return (
        <div className="!my-9 container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 m">
            <h2 className={`mb-1 text-3xl font-extrabold leading-tight dark:text-gray-300 text-gray-900`}>Services</h2>
            <p className="mb-12 text-lg text-gray-500">Here is a few of the awesome Services we provide.</p>
            <div className="w-full">
                <div className="flex flex-col w-full mb-10 sm:flex-row">
                    <div data-aos="fade-right" className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white dark:bg-gray-700 border-2 border-indigo-500 rounded-lg">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-700 dark:text-gray-100">DAPP Development</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">------------</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">A decentralized application (dapp) is an application built on a
                                    decentralized network that combines a smart contract and a frontend user interface.</p>
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-left" className="w-full sm:w-1/2">
                        <div className="relative h-full ml-0 md:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">Web 3.0 Development</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">------------</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">Web 3.0 is the third generation of Internet services that will
                                    focus on understanding and analyzing data to provide a semantic web.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-aos="zoom-in-right" className="flex flex-col w-full mb-5 sm:flex-row">
                    <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">Project Audit</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">------------</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">A Project Audit is a formal review of a project, which is intended
                                    to assess the extent up to which project management standards are being upheld.</p>
                            </div>
                        </div>
                    </div>
                    <div data-aos="zoom-in-up" className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">Hacking / RE</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">------------</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">A security hacker is someone who explores methods for breaching
                                    defenses and exploiting weaknesses in a computer system or network.</p>
                            </div>
                        </div>
                    </div>
                    <div data-aos="zoom-in-left" className="w-full sm:w-1/2">
                        <div className="relative h-full ml-0 md:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">Bot/Script Development</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">------------</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">Bot development frameworks were created as advanced software tools
                                    that eliminate a large amount of manual work and accelerate the development process.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services