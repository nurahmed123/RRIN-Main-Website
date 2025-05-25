'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";
import MagicButton from "@/components/MagicButton";
import { FaLocationArrow, FaSignInAlt, FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="pb-20 pt-36">
      {/* Spotlight Effects */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Background Grid */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      {/* Hero Section */}
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            
          </p>

          <TextGenerateEffect
            words="Your Intelligent AI Assistant for Every Task"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Experience the power of AI with our suite of specialized assistants for coding, content creation, and more.
          </p>

          <Link href="/signin" className="text-bold">
            <MagicButton
              title="Sign In"
              icon={<FaSignInAlt />}
              position="right"
            />
          </Link>
        </div>
      </div>

      {/* AI Services Section */}
      <div className="flex flex-col items-center relative my-20 z-10 px-4 md:px-8">
        <div className="max-w-7xl flex flex-col items-center justify-center">
          <TextGenerateEffect
            words="Our AI Services"
            className="text-center text-3xl md:text-5xl lg:text-6xl mb-8"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Chat Assistant */}
            <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 lg:p-8 bg-white dark:bg-zinc-900 flex flex-col items-center">
              <Link href="/ai/chat">
                <div className="h-[200px] w-[200px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
              </Link>
              <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
                AI Chat Assistant
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                Your general-purpose AI assistant for answering questions and providing information.
              </p>
            </BackgroundGradient>

            {/* Code Assistant */}
            <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 lg:p-8 bg-white dark:bg-zinc-900 flex flex-col items-center">
              <Link href="/ai/code-assistant">
                <div className="h-[200px] w-[200px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
              </Link>
              <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
                Code Assistant
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                Get help with coding, debugging, and software development best practices.
              </p>
            </BackgroundGradient>

            {/* Content Writer */}
            <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 lg:p-8 bg-white dark:bg-zinc-900 flex flex-col items-center">
              <Link href="/ai/content-writer">
                <div className="h-[200px] w-[200px] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                    <path d="M2 2l7.586 7.586"></path>
                    <circle cx="11" cy="11" r="2"></circle>
                  </svg>
                </div>
              </Link>
              <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
                Content Writer
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                Create engaging articles, blog posts, and marketing copy with AI assistance.
              </p>
            </BackgroundGradient>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="flex flex-col items-center relative mt-24 mb-16 z-10 px-4 md:px-8">
        <div className="max-w-7xl w-full">
          <TextGenerateEffect
            words="Why Choose Arionys AI"
            className="text-center text-2xl md:text-4xl lg:text-5xl mb-10"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-zinc-900/70 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Advanced AI Technology</h3>
              <p className="text-gray-300">Powered by state-of-the-art language models to deliver accurate, contextual, and helpful responses for all your needs.</p>
            </div>
            
            <div className="bg-zinc-900/70 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Specialized Assistants</h3>
              <p className="text-gray-300">Purpose-built AI assistants for different tasks, from general conversation to specialized code help and content creation.</p>
            </div>
            
            <div className="bg-zinc-900/70 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Secure & Private</h3>
              <p className="text-gray-300">Your conversations and data are handled with the highest standards of security and privacy protection.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex flex-col items-center relative mt-16 z-10 px-4 md:px-8">
        <h3 className="text-xl md:text-2xl mb-6">Find us with</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://github.com/arionysai" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900/70 rounded-full hover:bg-purple-900/50 transition-colors">
            <FaGithub size={24} />
          </a>
          <a href="https://twitter.com/arionysai" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900/70 rounded-full hover:bg-purple-900/50 transition-colors">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com/company/arionysai" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900/70 rounded-full hover:bg-purple-900/50 transition-colors">
            <FaLinkedin size={24} />
          </a>
          <a href="https://instagram.com/arionysai" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900/70 rounded-full hover:bg-purple-900/50 transition-colors">
            <FaInstagram size={24} />
          </a>
          <a href="https://youtube.com/arionysai" target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-900/70 rounded-full hover:bg-purple-900/50 transition-colors">
            <FaYoutube size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
