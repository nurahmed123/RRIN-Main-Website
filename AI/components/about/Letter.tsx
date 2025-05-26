import React from "react";
import Image from "next/image";

export default function Letter() {
  return (
    <div className="relative px-5 lg:px-0">
      <h2 className="text-transparent">About</h2>
      <div className="relative">
        {/* Letter Bottom */}
        <div className="absolute left-0 top-0 z-10 h-full w-full -rotate-1 rounded-lg bg-letter-middle bg-[#292f69] lg:-rotate-2"></div>
        {/* Letter Middle */}
        <div className="absolute left-1 top-1 z-20 h-[98%] w-[98%] -rotate-1 rounded-lg bg-letter-bottom lg:left-3 lg:top-10 lg:h-[95%] lg:w-[98%] lg:rotate-3 bg-[#31398d]"></div>
        {/* Letter Top */}
        <div className="relative z-30 -rotate-1 rounded-lg bg-letter-top shadow-letter-top lg:rotate-2 lg:rounded-xl bg-[#080a25]">
          <article className="space-y-4 p-4 text-base text-white/80 lg:space-y-5 lg:p-5 lg:px-24 lg:py-14 lg:text-2xl">
            <p>Hello Everyone 👋,</p>
            <p>
              Welcome to <strong>Arionys</strong> – a pioneering robotics and technology organization based in Bangladesh, dedicated to advancing the fields of robotics, mechatronics, and electrical project management.
            </p>
            <p>
              Our mission is to foster innovation and excellence in technology education through hands-on learning, community engagement, and real-world application.
            </p>
            <p>
              Here&apos;s what Arionys offers:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Educational Programs</strong> designed for various skill levels, including practical workshops and immersive theoretical courses.
              </li>
              <li>
                <strong>Innovative Projects</strong> in robotics, IoT, and machine learning, enhancing industry efficiency and pushing the boundaries of technology.
              </li>
              <li>
                <strong>Research and Development</strong> to continuously explore new technologies and trends.
              </li>
              <li>
                <strong>AI-powered solutions</strong> to help solve complex problems and enhance technological capabilities.
              </li>
            </ul>
            <p>
              Our notable achievements include qualifying for the <strong>NASA CONRAD CHALLENGE 2024</strong> (5th place) and competing in the global <strong>Moonshot Pirates Challenge</strong>.
            </p>
            <p>
              We also offer services including <strong>Web and App Development</strong>, <strong>Project Development</strong>, <strong>Research and Writing Services</strong>, and <strong>Sticker Printing</strong>.
            </p>
            <p>
              Arionys is more than just an organization; it&apos;s a community dedicated to pushing the boundaries of robotics and technology.
            </p>
            <div className="relative flex flex-col items-center gap-2">
              <div className="self-start">
                Innovation & Excellence 🚀
              </div>
            </div>
            <div className="mb-10 font-handwriting text-4xl lg:text-6xl">
              <div className="text-white">Arionys Team</div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <Image src={"/logo.png"} alt="Arionys" width={60} height={60} />
              </div>
              <div className="lg:ml-4">
                <div className="text-xl font-semibold text-white lg:text-2xl">
                  Arionys
                </div>
                <div className="text-[12px] lg:text-lg">
                  Pioneering Robotics and Technological Innovation
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}