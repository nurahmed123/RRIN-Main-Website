"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

const SLUG_PROMPTS = {
    "chat": "You are Arionys AI, a helpful AI assistant created by Arionys - a pioneering robotics and technology organization based in Bangladesh. ",
    "code-assistant": "You are Arionys Code Assistant, an expert in programming and software development created by Arionys - a pioneering robotics and technology organization. Help the user with coding questions, debugging, and best practices. ",
    "content-writer": "You are Arionys Content Writer, an expert in creating engaging and SEO-friendly content created by Arionys - a pioneering robotics and technology organization. Help the user draft articles, blog posts, and marketing copy. "
};

const SLUG_TITLES = {
    "chat": "AI Assistant",
    "code-assistant": "Code Assistant",
    "content-writer": "Content Writer"
};

const ChatPage = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const router = useRouter();
    const { isSignedIn, userId } = useAuth();
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Load chat history from localStorage when component mounts
    useEffect(() => {
        if (!isSignedIn) {
            router.push("/signin");
            return;
        }
        
        if (!Object.keys(SLUG_PROMPTS).includes(slug)) {
            router.push("/404");
            return;
        }
        
        // Load chat history from localStorage if available
        if (userId) {
            const chatHistoryKey = `chat_history_${userId}_${slug}`;
            const savedMessages = localStorage.getItem(chatHistoryKey);
            
            if (savedMessages) {
                try {
                    const parsedMessages = JSON.parse(savedMessages);
                    setMessages(parsedMessages);
                } catch (error) {
                    console.error("Error parsing saved messages:", error);
                }
            }
        }
    }, [isSignedIn, slug, router, userId]);

    // Save chat history to localStorage whenever messages change
    useEffect(() => {
        if (isSignedIn && userId && messages.length > 0) {
            const chatHistoryKey = `chat_history_${userId}_${slug}`;
            localStorage.setItem(chatHistoryKey, JSON.stringify(messages));
        }
    }, [messages, isSignedIn, userId, slug]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const context = SLUG_PROMPTS[slug as keyof typeof SLUG_PROMPTS];
            const searchQuery = `${context}${input}`;

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: searchQuery,
                    context: context,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages((prev) => [...prev, { role: "assistant", content: data || "No response" }]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "An error occurred. Please try again later." },
                ]);
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "An error occurred. Please try again later." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    // Add a function to clear chat history
    const clearChatHistory = () => {
        if (isSignedIn && userId) {
            const chatHistoryKey = `chat_history_${userId}_${slug}`;
            localStorage.removeItem(chatHistoryKey);
            setMessages([]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 pb-20 pt-28 sm:pt-32 md:pt-36">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold capitalize text-center w-full sm:text-left sm:w-auto">
                    Arionys {SLUG_TITLES[slug as keyof typeof SLUG_TITLES] || slug.replace("-", " ")}
                </h1>
                {messages.length > 0 && (
                    <button 
                        onClick={clearChatHistory}
                        className="px-3 py-1 text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors hidden sm:block"
                    >
                        Clear History
                    </button>
                )}
            </div>
            
            <div className="chat-box border border-gray-700 rounded-lg h-[60vh] sm:h-[65vh] md:h-[70vh] p-4 overflow-y-auto bg-gray-900/80 backdrop-blur-sm">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <p className="mt-4 text-center">Start a conversation with Arionys {SLUG_TITLES[slug as keyof typeof SLUG_TITLES] || "AI"}!</p>
                    </div>
                )}
                {messages.map((message, index) => {
                    return (
                        <div
                            key={index}
                            className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                        >
                            <div
                                className={`inline-block px-4 py-2 rounded-lg max-w-[90%] sm:max-w-[80%] ${message.role === "user"
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-800 text-white"
                                    }`}
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeSanitize]}
                                    components={{
                                        a: ({ href, children }) => (
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 underline"
                                            >
                                                {children}
                                            </a>
                                        ),
                                        code: ({ node, inline, className, children, ...props }) => {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline ? (
                                                <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                                                    <code className={className}>{children}</code>
                                                </pre>
                                            ) : (
                                                <code className="bg-gray-900 px-1 py-0.5 rounded">{children}</code>
                                            );
                                        },
                                    }}
                                >
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    );
                })}
                {isLoading && (
                    <div className="mb-2 text-left text-gray-500">
                        <div className="inline-block px-4 py-2 rounded-lg bg-gray-800 text-white">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-1"></div>
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-75 mr-1"></div>
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-4 flex flex-col sm:flex-row">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 p-2 sm:p-3 border border-gray-700 rounded-lg bg-gray-900/80 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2 sm:mb-0"
                    placeholder="Type your message..."
                    disabled={isLoading}
                />

                <div className="flex justify-between w-full sm:w-auto sm:ml-2">
                    {messages.length > 0 && (
                        <button 
                            onClick={clearChatHistory}
                            className="px-3 py-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors mr-2 sm:hidden"
                        >
                            Clear
                        </button>
                    )}
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex-grow sm:flex-grow-0"
                        disabled={isLoading}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
