"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";

const SLUG_PROMPTS = {
    "dveg-res-serach": "I am a vegetarian, I am looking for a recipe for my meal. Please give me a recipe that will be so tasty within my avialable items. I have some items in my home these are",
    "nonveg-protein": "I am a vegetarian. gimme the raw answer, i have a food item but I want to know if it is a veg or non-veg item and how much protein it has and what are alternative veg and non-veg items are similar in their vitamins and nutrition. my food item is ",
    "daily-diat": "",
};

const SLUG_TITLES = {
    "dveg-res-serach": "Vegetarian Recipe Search",
    "nonveg-protein": "Non-veg Protein Replacement Tool",
    "daily-diat": "Daily Plant-based Diet Plan",
};

const ChatPage = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const router = useRouter();
    const { isSignedIn } = useAuth();
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

    useEffect(() => {
        if (!isSignedIn) {
            router.push("/signin");
        }
        if (!Object.keys(SLUG_PROMPTS).includes(slug)) {
            router.push("/404");
        }
    }, [isSignedIn, slug, router]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput(""); // Clear input field
        setIsLoading(true); // Set loading state to true

        try {
            const context = SLUG_PROMPTS[slug as keyof typeof SLUG_PROMPTS]; // Cast slug to valid key
            console.log(context);
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
            setIsLoading(false); // Set loading state to false after the response
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent default Enter key behavior (e.g., new line)
            handleSendMessage(); // Trigger message send on Enter key
        }
    };

    return (
        <div className="container mx-auto pb-20 pt-36">
            <h1 className="text-xl font-bold mb-4 capitalize text-center">
                {SLUG_TITLES[slug as keyof typeof SLUG_TITLES] || slug.replace("-", " ")}
            </h1>
            <div className="chat-box border rounded-lg h-[70vh] p-4 overflow-y-auto">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                    >
                        <div
                            className={`inline-block px-4 py-2 rounded-lg ${message.role === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-black"
                                }`}
                        >
                            {/* Use ReactMarkdown to render Markdown */}
                            <ReactMarkdown>
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    </div>

                ))}
                {isLoading && (
                    <div className="mb-2 text-left text-gray-500">
                        <div className="inline-block px-4 py-2 rounded-lg bg-gray-300 text-black">
                            AI is thinking...
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-4 flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown} // Listen for Enter key press
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="Type your message..."
                    disabled={isLoading} // Disable input while loading
                />

                <button
                    onClick={handleSendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    disabled={isLoading} // Disable button while loading
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
