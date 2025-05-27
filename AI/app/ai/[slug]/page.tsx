"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

const SLUG_PROMPTS = {
    "chat": "You are Arionys AI, a helpful AI assistant created by Arionys - a pioneering IT and technology company based in Bangladesh. Arionys specializes in robotics, mechatronics, and electrical project management, offering services in web development, mobile applications, UAV development, 3D design & printing, and video production. We are dedicated to fostering innovation through comprehensive education and hands-on experiences. RoboSuperior, established in 2022, is our specialized robotics team that focuses on developing intelligent robotic systems, automation solutions, and AI applications. The team excels in robotics research, competitive robotics challenges, and healthcare robotics applications.",
    "code-assistant": "You are Arionys Code Assistant, an expert in programming and software development created by Arionys - a pioneering IT and technology company based in Bangladesh. Help the user with coding questions, debugging, and best practices. Our expertise includes custom web development, mobile application development, and full-stack project development. Through our robotics team RoboSuperior, we also specialize in robotics programming, automation systems, and AI algorithm implementation.",
    "content-writer": "You are Arionys Content Writer, an expert in creating engaging and SEO-friendly content created by Arionys - a pioneering IT and technology company based in Bangladesh. Help the user draft articles, blog posts, and marketing copy. Drawing from our expertise in technology and innovation, including the achievements of RoboSuperior (our dedicated robotics team established in 2022), you create content that showcases our commitment to advancing technology solutions in robotics, automation, and artificial intelligence."
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

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
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
                        className="px-3 py-1 text-sm text-red-500 hover:text-red-600 transition-colors border border-red-500/20 hover:border-red-500/40 rounded-lg bg-red-500/5 hover:bg-red-500/10"
                    >
                        Clear History
                    </button>
                )}
            </div>

            <div className="chat-box border border-gray-700 rounded-lg h-[60vh] sm:h-[65vh] md:h-[70vh] p-4 overflow-y-auto bg-gray-900/80 backdrop-blur-sm">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                            <path d="M18 14h-8"></path>
                            <path d="M18 18h-8"></path>
                            <path d="M18 10h-8"></path>
                        </svg>
                        <p className="mt-4 text-center">Start a conversation with Arionys {SLUG_TITLES[slug as keyof typeof SLUG_TITLES] || "AI"}!</p>
                    </div>
                )}
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
                    >
                        <div className="flex flex-col">
                            <div
                                className={`${message.role === "user"
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-800 text-white max-w-[90%] sm:max-w-[80%]"
                                    } rounded-lg p-4 relative shadow-lg border border-purple-500/20`}
                            >
                                <div className={`${message.role === "user" ? "relative z-10 w-full" : ""}`}>
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
                                            code({ node, inline, className, children, ...props }: any) {
                                                const match = /language-(\w+)/.exec(className || '');
                                                return !inline && match ? (
                                                    <div className="flex flex-col gap-2">
                                                        <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto border border-gray-700">
                                                            <code className={className} {...props}>
                                                                {children}
                                                            </code>
                                                        </pre>
                                                        <button
                                                            onClick={() => copyToClipboard(String(children).replace(/\n$/, ''))}
                                                            className="self-end px-3 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-1 border border-gray-600"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6zm0-2h8a4 4 0 014 4v11a4 4 0 01-4 4H6a4 4 0 01-4-4V5a4 4 0 014-4z" />
                                                            </svg>
                                                            Copy code
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <code className={`bg-gray-900 px-1 py-0.5 rounded ${className} border border-gray-700`} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            },
                                        }}
                                    >
                                        {message.content}
                                    </ReactMarkdown>
                                </div>
                                {message.role === "user" && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-800/10 rounded-2xl blur-xl -z-10"></div>
                                )}
                            </div>
                            {message.role === "assistant" && (
                                <button
                                    onClick={() => copyToClipboard(message.content)}
                                    className="self-start mt-2 px-3 py-1 text-xs rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-1 border border-gray-600"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6zm0-2h8a4 4 0 014 4v11a4 4 0 01-4 4H6a4 4 0 01-4-4V5a4 4 0 014-4z" />
                                    </svg>
                                    Copy message
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="mb-2 text-left text-gray-500">
                        <div className="inline-block px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-1"></div>
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-75 mr-1"></div>
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4">
                <div className="flex gap-2 p-4 bg-gray-900/80 rounded-lg border border-gray-700">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="flex-1 p-2 sm:p-3 border border-gray-700 rounded-lg bg-gray-900/80 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !input.trim()}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-purple-500/20"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
