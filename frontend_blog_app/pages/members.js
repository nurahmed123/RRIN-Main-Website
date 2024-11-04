import React from "react";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import Link from "next/link";
import {
    FaGithub,
    FaFacebook,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

const Members = () => {
    const { alldata, loading } = useFetchData(`/api/getmember?status=active`);

    if (loading) {
        return <p>Loading...</p>;
    }

    // List of specified departments
    const specifiedDepartments = [
        "founder",
        "it_dpt",
        "hardware_dpt",
        "research_dpt",
        "media_dpt",
    ];

    // Group members by specified departments
    const groupedMembers = {
        "Founders & Co-Founders": alldata.filter((member) => member.department === "founder"),
        "IT Department": alldata.filter((member) => member.department === "it_dpt"),
        "Hardware Department": alldata.filter(
            (member) => member.department === "hardware_dpt"
        ),
        "Research Department": alldata.filter(
            (member) => member.department === "research_dpt"
        ),
        "Media Department": alldata.filter((member) => member.department === "media_dpt"),
        Others: alldata.filter(
            (member) => !specifiedDepartments.includes(member.department)
        ),
    };

    // Filter out departments with no members
    const departments = Object.entries(groupedMembers).filter(
        ([, members]) => members.length > 0
    );

    return (
        <section className="min-h-screen dark:bg-slate-800 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
                Meet Our Team
            </h1>
            <div className="flex flex-col gap-10">
                {departments.map(([department, members]) => (
                    <div key={department}>
                        <div className="block !container">
                            <h2 className="text-2xl font-semibold mb-4 text-left text-gray-800 dark:text-gray-100">
                                {department}
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-6 items-center justify-start">
                            {members.reverse().map((member, index) => ( // Reverse the members array
                                <div
                                    key={index}
                                    className="bg-gray-100 dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform"
                                >
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={128}
                                            height={128}
                                            className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                                        />
                                        <div className="w-fit transition-all transform duration-500">
                                            <h1 className="text-gray-600 dark:text-gray-200 font-bold">
                                                {member.name}
                                            </h1>
                                            <p className="text-gray-400">{member.role}</p>
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="text-xs text-gray-500 dark:text-gray-200 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500"
                                            >
                                                {member.email}
                                            </a>
                                            <br />
                                            <a
                                                href={`tel:${member.phone}`}
                                                className="text-xs text-gray-500 dark:text-gray-200 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500"
                                            >
                                                {member.phone}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="absolute group-hover:bottom-1 delay-300 -bottom-16 transition-all duration-500 bg-gray-600 dark:bg-gray-100 right-1 rounded-lg">
                                        <div className="flex justify-evenly items-center gap-2 p-1 text-2xl text-white dark:text-gray-600">
                                            {member.linkedin && (
                                                <Link
                                                    href={member.linkedin}
                                                    target="_blank"
                                                >
                                                    <FaLinkedinIn />
                                                </Link>
                                            )}
                                            {member.github && (
                                                <Link href={member.github} target="_blank">
                                                    <FaGithub />
                                                </Link>
                                            )}
                                            {member.facebook && (
                                                <Link
                                                    href={member.facebook}
                                                    target="_blank"
                                                >
                                                    <FaFacebook />
                                                </Link>
                                            )}
                                            {member.twitter && (
                                                <Link href={member.twitter} target="_blank">
                                                    <FaXTwitter />
                                                </Link>
                                            )}
                                            {member.instagram && (
                                                <Link
                                                    href={member.instagram}
                                                    target="_blank"
                                                >
                                                    <FaInstagram />
                                                </Link>
                                            )}
                                            {member.youtube && (
                                                <Link href={member.youtube} target="_blank">
                                                    <FaYoutube />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Members;
