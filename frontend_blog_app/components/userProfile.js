import React from 'react'
import useFetchData from "@/hooks/useFetchData";

const UserProfile = () => {
  const { alldata, loading } = useFetchData(`/api/createuser`);
  console.log(alldata)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!alldata) {
    return <div>No data available</div>;
  }

  const { name, bio, image, twitter, linkedin, github } = alldata;
  console.log(name)
  console.log(bio)
  console.log(image)

  return (
    <div>
      <div className="max-w-lg mx-auto my-10 bg-white dark:text-gray-100 shadow-xl dark:bg-slate-800 rounded-lg p-5">
        <img className="w-32 h-32 rounded-full mx-auto" src={image || "https://picsum.photos/200"} alt="Profile picture"/>
          <h2 className="text-center text-2xl font-semibold mt-3">{name || "John Doe"}</h2>
          <div className="flex justify-center mt-5">
            {twitter && <a href={twitter} className="text-blue-500 hover:text-blue-700 mx-3">Twitter</a>}
            {linkedin && <a href={linkedin} className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>}
            {github && <a href={github} className="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>}
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold">Bio</h3>
            <p className="text-gray-600 mt-2 dark:text-gray-200">{bio || "John is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js."}</p>
          </div>
      </div>
    </div>
  )
}

export default UserProfile;
