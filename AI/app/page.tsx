'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";
import MagicButton from "@/components/MagicButton";
import { FaLocationArrow, FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const HomePage = () => {
  const router = useRouter();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="pb-20 pt-36">
      {/* Hero Section */}
      <div className="flex justify-center relative my-20 z-10">
        <motion.div
          className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p
            className="uppercase tracking-widest text-xs text-center text-purple-500 dark:text-purple-400 max-w-80 mb-4"
            variants={fadeInUp}
          >
            Welcome to the Future of AI Assistance
          </motion.p>

          <motion.div variants={fadeInUp}>
            <TextGenerateEffect
              words="Your Intelligent AI Assistant for Every Task"
              className="text-center text-[40px] md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400"
            />
          </motion.div>

          <motion.p
            className="text-center md:tracking-wider mb-8 text-sm md:text-lg lg:text-2xl text-gray-600 dark:text-gray-300"
            variants={fadeInUp}
          >
            Experience the power of AI with our suite of specialized assistants for coding, content creation, and more.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link href="/signin" className="text-bold">
              <MagicButton
                title="Get Started"
                icon={<FaSignInAlt />}
                position="right"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* AI Services Section */}
      <div className="flex flex-col items-center relative my-20 z-10 px-4 md:px-8">
        <motion.div
          className="max-w-7xl flex flex-col items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <TextGenerateEffect
              words="Our AI Services"
              className="text-center text-3xl md:text-5xl lg:text-6xl mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400"
            />
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Discover our suite of intelligent AI assistants designed to enhance your productivity and creativity
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {/* AI Chat Assistant */}
            <motion.div variants={fadeInUp}>
              <BackgroundGradient className="rounded-[22px] p-6 sm:p-8 lg:p-10 bg-white dark:bg-zinc-900 flex flex-col items-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Link href="/ai/chat" className="group">
                  <div className="h-[200px] w-[200px] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 dark:text-purple-400 transform group-hover:scale-110 transition-transform duration-300">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                </Link>
                <p className="text-xl sm:text-2xl text-black mt-6 mb-3 dark:text-neutral-200 text-center font-bold">
                  AI Chat Assistant
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center leading-relaxed">
                  Your intelligent companion for answering questions, providing information, and engaging in meaningful conversations.
                </p>
              </BackgroundGradient>
            </motion.div>

            {/* Code Assistant */}
            <motion.div variants={fadeInUp}>
              <BackgroundGradient className="rounded-[22px] p-6 sm:p-8 lg:p-10 bg-white dark:bg-zinc-900 flex flex-col items-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Link href="/ai/code-assistant" className="group">
                  <div className="h-[200px] w-[200px] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 dark:text-blue-400 transform group-hover:scale-110 transition-transform duration-300">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                </Link>
                <p className="text-xl sm:text-2xl text-black mt-6 mb-3 dark:text-neutral-200 text-center font-bold">
                  Code Assistant
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center leading-relaxed">
                  Expert guidance for coding, debugging, and implementing software development best practices.
                </p>
              </BackgroundGradient>
            </motion.div>

            {/* Content Writer */}
            <motion.div variants={fadeInUp}>
              <BackgroundGradient className="rounded-[22px] p-6 sm:p-8 lg:p-10 bg-white dark:bg-zinc-900 flex flex-col items-center hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Link href="/ai/content-writer" className="group">
                  <div className="h-[200px] w-[200px] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-pink-500/10 dark:bg-pink-400/10 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500 dark:text-pink-400 transform group-hover:scale-110 transition-transform duration-300">
                      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                      <path d="M2 2l7.586 7.586"></path>
                      <circle cx="11" cy="11" r="2"></circle>
                    </svg>
                  </div>
                </Link>
                <p className="text-xl sm:text-2xl text-black mt-6 mb-3 dark:text-neutral-200 text-center font-bold">
                  Content Writer
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center leading-relaxed">
                  Create compelling content with AI assistance, from blog posts to marketing copy and creative writing.
                </p>
              </BackgroundGradient>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Additional Information Section */}
      <div className="flex flex-col items-center relative mt-24 mb-16 z-10 px-4 md:px-8">
        <motion.div
          className="max-w-7xl w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <TextGenerateEffect
              words="Why Choose Arionys AI"
              className="text-center text-2xl md:text-4xl lg:text-5xl mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400"
            />
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Experience the perfect blend of cutting-edge technology and user-friendly design
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 dark:bg-zinc-900/70 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 dark:border-purple-400/20 hover:border-purple-500/40 dark:hover:border-purple-400/40 transition-all duration-300 hover:shadow-xl group"
            >
              <div className="h-12 w-12 bg-purple-500/10 dark:bg-purple-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 dark:text-purple-400">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-500 dark:text-purple-400">Advanced AI Technology</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Powered by state-of-the-art language models to deliver accurate, contextual, and helpful responses for all your needs.</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white/10 dark:bg-zinc-900/70 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 dark:border-blue-400/20 hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all duration-300 hover:shadow-xl group"
            >
              <div className="h-12 w-12 bg-blue-500/10 dark:bg-blue-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 dark:text-blue-400">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-500 dark:text-blue-400">Specialized Assistants</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Purpose-built AI assistants for different tasks, from general conversation to specialized code help and content creation.</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white/10 dark:bg-zinc-900/70 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/20 dark:border-pink-400/20 hover:border-pink-500/40 dark:hover:border-pink-400/40 transition-all duration-300 hover:shadow-xl group"
            >
              <div className="h-12 w-12 bg-pink-500/10 dark:bg-pink-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500 dark:text-pink-400">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-pink-500 dark:text-pink-400">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Your conversations and data are handled with the highest standards of security and privacy protection.</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
