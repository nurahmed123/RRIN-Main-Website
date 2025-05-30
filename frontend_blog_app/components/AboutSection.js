import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Script from "next/script";
import TeamMembers from './TeamMembers'

const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RoboSuperior",
    "description": "ROBO Superior is a leading organization dedicated to advancing robotics, mechatronics and electrical project management in Bangladesh.",
    "url": process.env.SITE_URL,
    "logo": `${process.env.SITE_URL}/img/Coder.png`,
    "sameAs": [
        "https://www.linkedin.com/company/robo-superior",
        "https://www.facebook.com/robosuperior",
        "https://www.instagram.com/robo__superior/",
        "https://x.com/robo_superior"
    ]
}

const AboutSection = () => {
    return (
        <div className="">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div data-aos="zoom-in-right" className="col-span-4 sm:col-span-3">
                        <div className="bg-white dark:bg-slate-700 shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                {/* <img src="../public/img/Coder.png"> */}
                                {/* <Image src={"/../public/img/Coder.png"} height={'100'} width={'100'} /> */}
                                <Image src={"/img/Coder.png"} alt='RoboSuperior' height={"100"} width={"100"} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
                                <h1 className="text-xl font-bold dark:text-gray-50">RoboSuperior</h1>
                                <p className="text-gray-700 dark:text-gray-300"></p>
                                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                    <Link href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</Link>
                                    <Link href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</Link>
                                </div>
                            </div>
                            <hr className="my-6 border-t border-gray-300" />
                            <div className="flex flex-col">
                                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2 dark:text-gray-50">Menu</span>
                                <ul>
                                    <Link href={"/"}><li className="mb-2 dark:text-gray-50">Home</li></Link>
                                    <Link href={"/blog"}><li className="mb-2 dark:text-gray-50">Blog</li></Link>
                                    <Link href={"/project"}><li className="mb-2 dark:text-gray-50">Projects</li></Link>
                                    <Link href={"/achievement"}><li className="mb-2 dark:text-gray-50">Achievements</li></Link>
                                    <Link href={"/about"}><li className="mb-2 dark:text-gray-50 !text-[#5485e0]">About us</li></Link>
                                    <Link href={"/members"}><li className="mb-2 dark:text-gray-50">Member</li></Link>
                                    <Link href={"/contact"}><li className="mb-2 dark:text-gray-50">Contact</li></Link>
                                </ul>
                                {/* Adsterra Ad Script
                                <Script
                                    id="adsterra-script"
                                    strategy="lazyOnload"
                                    src="//pl25949179.effectiveratecpm.com/0d/8c/b4/0d8cb431300cd1925f1d61ca5d9eb3c1.js"
                                /> */}
                            </div>
                        </div>
                    </div>
                    <div data-aos="zoom-in-left" className="col-span-4 sm:col-span-9">
                        <div className="bg-white dark:bg-slate-700 shadow rounded-lg p-6">
                            <h1 className="text-xl font-bold mb-4 dark:text-gray-50">About Us</h1>
                            <p className="text-gray-70 dark:text-gray-50">ROBO Superior: Building the Future of Robotics in Bangladesh


                                .
                                <br /><br />
                                ROBO Superior is at the forefront of revolutionizing robotics, mechatronics, and electrical project management in Bangladesh. Our mission is bold: to cultivate a thriving ecosystem of innovators and technology enthusiasts through cutting-edge education, hands-on experiences, and a vibrant community of like-minded individuals.
                                {/* <Link href={"/achievement"} className='text-xl italic font-bold'>achieved</Link> remarkable success in various <Link href="/project" className='text-xl italic font-bold'>project</Link> showcase competitions. The most notable highlight in our history is the exceptional accomplishment of our organization’s “Team EXO MAX.” This team qualified for the international round of the prestigious NASA CONRAD CHALLENGE 2024, a global scientific case study and problem-solving contest. Competing against over 3,000 contestants worldwide, Team EXO MAX secured an impressive 5th place in the whole world, showcasing the talent and dedication present within our organization. */}
                                <br /><br />
                                We are more than just an organization—we’re a movement dedicated to shaping the next generation of engineers and technologists. With programs designed for every skill level, we offer a mix of practical workshops, immersive theoretical courses, and engaging extracurricular activities (ECAs) to fuel curiosity and mastery in robotics.
                                <br /><br />
                                At ROBO Superior, we believe that innovation thrives at the intersection of knowledge and practice. That’s why we place a strong emphasis on bridging the gap between the classroom and real-world application. Whether through project-based learning, mentorship, or collaborative initiatives, we prepare our members to excel in dynamic, fast-evolving fields.
                                <br /><br />
                                Our focus on mechatronics and robotics-related project management ensures that our community is equipped with the tools to lead in the technological frontier. Together, we’re empowering individuals to dream big, think boldly, and push the boundaries of possibility.
                                <br /><br />
                                Join us in our mission to elevate robotics education, foster innovation, and drive excellence. Together, we are ROBO Superior—pioneering the future of technology and engineering in Bangladesh.

                            </p>

                            <h2 className="dark:text-gray-50 font-semibold text-center mt-3 -mb-2">
                                Find us at
                            </h2>
                            <div className="flex justify-center items-center gap-6 my-6">
                                <Link className="text-gray-700 dark:text-gray-50 hover:text-orange-600" aria-label="Visit TrendyMinds LinkedIn" href="https://www.linkedin.com/company/robo-superior"
                                    target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6">
                                        <path fill="currentColor"
                                            d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z">
                                        </path>
                                    </svg>
                                </Link>
                                {/* <Link className="text-gray-700 dark:text-gray-50 hover:text-orange-600" aria-label="Visit TrendyMinds YouTube" href=""
                                    target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6">
                                        <path fill="currentColor"
                                            d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z">
                                        </path>
                                    </svg>
                                </Link> */}
                                <Link className="text-gray-700 dark:text-gray-50 hover:text-orange-600" aria-label="Visit TrendyMinds Facebook" href="https://www.facebook.com/robosuperior"
                                    target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-6">
                                        <path fill="currentColor"
                                            d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                                        </path>
                                    </svg>
                                </Link>
                                <Link className="text-gray-700 dark:text-gray-50 hover:text-orange-600" aria-label="Visit TrendyMinds Instagram" href="https://www.instagram.com/robo__superior/"
                                    target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-6">
                                        <path fill="currentColor"
                                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                                        </path>
                                    </svg>
                                </Link>
                                <Link className="text-gray-700 dark:text-gray-50 hover:text-orange-600" aria-label="Visit TrendyMinds Twitter" href="https://x.com/robo_superior"
                                    target="_blank">
                                    <svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor"
                                            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
                                        </path>
                                    </svg>
                                </Link>
                            </div>


                            {/* <h2 className="text-xl font-bold mt-6 mb-4 dark:text-gray-50">Our Team</h2>
                            <div className="containere">
                                <TeamMembers/>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </div>
    )
}

export default AboutSection
