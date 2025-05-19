import Image from 'next/image';
import React from 'react';

const Additionalinfo = () => {
    return (
        <section className="overflow-hidden py-8 sm:py-16 mt-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* First Section: Company Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <div data-aos="zoom-in-right" className="lg:pr-8">
                        <div className="lg:max-w-lg">
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">We are Arionys</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                All about Software and Technology.
                            </p>

                            <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600">
                                {/* Feature 1 */}
                                <div className="relative pl-9">
                                    <dt className="dark:text-gray-200 inline font-semibold text-gray-900">
                                        <Image
                                            src="https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/90cefa21-7e28-4c62-a3e2-ace4f64a3d94.png"
                                            width={30}
                                            height={30}
                                            className="absolute left-1 top-1"
                                            alt=""
                                            style={{ filter: "invert(85%) sepia(100%) saturate(7472%) hue-rotate(246deg) brightness(98%) contrast(78%)" }}
                                        />
                                        Innovative Robotics Solutions:
                                    </dt>
                                    <dd className="inline dark:text-gray-400">
                                        <br></br>Arionys specializes in cutting-edge robotics development, providing advanced solutions for automation, AI integration, and intelligent systems.
                                    </dd>
                                </div>

                                {/* Feature 2 */}
                                <div className="relative pl-9">
                                    <dt className="dark:text-gray-200 inline font-semibold text-gray-900">
                                        <Image
                                            src="https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/908a6ba1-426b-44c7-9df9-23c1005c827b.png"
                                            width={30}
                                            height={30}
                                            className="absolute left-1 top-1"
                                            alt=""
                                            style={{ filter: "invert(85%) sepia(100%) saturate(7472%) hue-rotate(246deg) brightness(98%) contrast(78%)" }}
                                        />
                                        Technology-Driven Projects:
                                    </dt>
                                    <dd className="inline dark:text-gray-400">
                                        <br></br> We are dedicated to pushing the boundaries of Technology, delivering projects in Robotics, IoT, and Machine Learning to enhance industry efficiency.
                                    </dd>
                                </div>

                                {/* Feature 3 */}
                                <div className="relative pl-9">
                                    <dt className="dark:text-gray-200 inline font-semibold text-gray-900">
                                       <svg
  className="absolute left-1 top-1 h-5 w-5 text-[#764ee7]"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="currentColor"
>
  <path
    fillRule="evenodd"
    d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414a2 2 0 00-.586-1.414l-3.414-3.414A2 2 0 008.586 2H4zm7 5V3.5L15.5 9H11z"
    clipRule="evenodd"
  />
</svg>

                                        Research and Development:
                                    </dt>
                                    <dd className="inline dark:text-gray-400">
                                         <br></br>Arionys prioritizes Research, continuously exploring new technologies and trends to stay at the forefront of the Robotics and Tech industry.
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-10 flex items-center gap-x-6">
                                <a href="contact" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                                    Start for free
                                </a>
                                {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-700">→</a> */}
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1080&q=80"
                            alt="Product screenshot"
                            className="w-full h-auto rounded-xl shadow-xl ring-1 ring-gray-400/10"
                        />
                    </div>
                </div>

                {/* Second Section: Robotics Team */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-32">
                    {/* Image */}
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1599134842279-fe807d23316e"
                            alt="Robotics Team"
                            className="w-full h-auto rounded-xl shadow-xl ring-1 ring-black ring-opacity-5"
                        />
                    </div>

                    {/* Text */}
                    <div data-aos="zoom-in-left" className="lg:pr-8">
                        <div>
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500">
                               <svg
  className="h-8 w-8 text-white"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
>
  <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M5.5 21a6.5 6.5 0 0113 0"
  />
</svg>


                            </span>
                        </div>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
                            Robotics Team
                        </h2>
                        <p className="mt-4 text-lg dark:text-gray-300 text-gray-800">
                            The Robotics Team of Arionys is a group of skilled engineers and innovators passionate about designing and developing advanced robotic systems. We focus on creating intelligent, high-performance robots that push the limits of Technology and Automation.
                        </p>
                        <div className="mt-6">
                            <a
                                className="inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700"
                                href="https://airtable.com/appc57OVgolVHcsY0/pagCIRnLfrl5ZOvJi/form"
                            >
                                Join The Team
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Additionalinfo;
