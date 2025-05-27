"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

const ProfilePage = () => {
    const { isSignedIn, userId } = useAuth();
    const router = useRouter();
    const [chatTypes, setChatTypes] = useState<string[]>([]);

    useEffect(() => {
        if (!isSignedIn) {
            router.push("/signin");
            return;
        }

        // Get all chat types from localStorage
        const chatTypes = ["chat", "code-assistant", "content-writer"];
        setChatTypes(chatTypes);
    }, [isSignedIn, router]);

    const clearAllHistory = () => {
        if (!userId) return;

        // Clear history for all chat types
        chatTypes.forEach(type => {
            const chatHistoryKey = `chat_history_${userId}_${type}`;
            localStorage.removeItem(chatHistoryKey);
        });

        // Show success message
        alert("All chat history has been cleared!");
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 pb-20 pt-28 sm:pt-32 md:pt-36">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white/10 dark:bg-zinc-900/70 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 dark:border-purple-400/20">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
                        <UserButton afterSignOutUrl="/" />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/5 dark:bg-zinc-800/50 p-6 rounded-xl">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Chat History</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Clear your chat history across all AI assistants. This action cannot be undone.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={clearAllHistory}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                                Clear All History
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage; 