import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function Sendsms({
    _id,
    securitycode: initialSecurityCode = "",
    subject: initialSubject = "",
    disNumber: initialDisNumber = "",
    message: initialMessage = "",
    provider: initialProvider = "Bulk_SMS_BD",
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!session && status !== "loading") {
            router.push("/login");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return (
            <div className="full-h flex flex-center">
                <div className="loading-bar">Loading</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    // State Variables
    const [securitycode, setSecuritycode] = useState(initialSecurityCode);
    const [subject, setSubject] = useState(initialSubject);
    const [disNumber, setDisNumber] = useState(initialDisNumber);
    const [message, setMessage] = useState(initialMessage);
    const [provider, setProvider] = useState(initialProvider);
    const [loading, setLoading] = useState(false);
    const [senderid, setSenderid] = useState("");
    const [apiUrl, setApiUrl] = useState("");
    const [balance, setBalance] = useState(null);

    // Constants
    const API_CONFIG = {
        [process.env.NEXT_PUBLIC_BULK_SMS_BD_NUR_SEC_CODE]: {
            apiKey: process.env.NEXT_PUBLIC_BULK_SMS_BD_NUR_API,
            senderid: process.env.NEXT_PUBLIC_BULK_SMS_BD_NUR_USERID,
            url: process.env.NEXT_PUBLIC_BULK_SMS_BD_NUR_URL,
            balanceUrl: "http://bulksmsbd.net/api/getBalanceApi",
        },
        [process.env.NEXT_PUBLIC_BULK_SMS_BD_RS_SEC_CODE]: {
            apiKey: process.env.NEXT_PUBLIC_BULK_SMS_BD_RS_API,
            senderid: process.env.NEXT_PUBLIC_BULK_SMS_BD_RS_USERID,
            url: process.env.NEXT_PUBLIC_BULK_SMS_BD_RS_URL,
            balanceUrl: "http://bulksmsbd.net/api/getBalanceApi",
        },
    };

    const getApiConfig = (code) => API_CONFIG[code] || { apiKey: "", senderid: "", url: "", balanceUrl: "" };

    // Derived States
    useEffect(() => {
        const config = getApiConfig(securitycode);
        setSenderid(config.senderid);
        setApiUrl(config.url);

        if (config.apiKey && config.balanceUrl) {
            fetchBalance(config.apiKey, config.balanceUrl);
        }
    }, [securitycode]);

    // Fetch Balance
    const fetchBalance = async (apiKey, balanceUrl) => {
        try {
            const response = await axios.get(`${balanceUrl}?api_key=${apiKey}`);
            setBalance(response.data.balance);
        } catch (error) {
            console.error("Error fetching balance:", error);
            toast.error("Failed to fetch balance.");
        }
    };

    // Form Submit Handler
    const sendMessage = async (ev) => {
        ev.preventDefault();
        setLoading(true);

        try {
            const { apiKey, senderid, url } = getApiConfig(securitycode);
            if (!apiKey || !senderid || !url) {
                throw new Error("Invalid security code configuration.");
            }

            const payload = {
                url,
                senderid,
                apiKey,
                number: disNumber,
                message: message.trim(),
            };

            const response = await axios.post(
                `${payload.url}?api_key=${payload.apiKey}&type=text&number=${payload.number}&senderid=${payload.senderid}&message=${payload.message}`
            );
            toast.success("Message Sent Successfully!");
            router.push("/sendsms");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="blogsadd">
            <div className="addblogspage">
                <form onSubmit={sendMessage} className="addWebsiteform">
                    <h1 className="text-center text-5xl from-accent-foreground">
                        Welcome
                        {process.env.NEXT_PUBLIC_BULK_SMS_BD_NUR_SEC_CODE === securitycode && " Nur Sir! "}
                        {process.env.NEXT_PUBLIC_BULK_SMS_BD_RS_SEC_CODE === securitycode && " Admin! "}
                        To SMS Portal 🥰
                    </h1>

                    {/* Security Code */}
                    <div className="w-100 flex flex-col flex-left mb-2">
                        <label htmlFor="securitycode">Security Code</label>
                        <input
                            required
                            type="password"
                            id="securitycode"
                            placeholder="Enter your security code"
                            value={securitycode}
                            onChange={(ev) => setSecuritycode(ev.target.value)}
                        />
                    </div>

                    {(securitycode === process.env.NEXT_PUBLIC_BULK_SMS_BD_NUR_SEC_CODE || securitycode === process.env.NEXT_PUBLIC_BULK_SMS_BD_RS_SEC_CODE) && (
                        <>
                            {/* balance show */}
                            {balance !== null && (
                                <div className="w-100 flex flex-col flex-left mb-2">
                                    <label>Available Balance:</label>
                                    <p>{!balance ? "Invalid" : balance} SMS</p>
                                </div>
                            )}

                            {/* Recipient Number */}
                            <div className="w-100 flex flex-col flex-left mb-2">
                                <label htmlFor="disNumber">Send to</label>
                                <input
                                    required
                                    type="number"
                                    id="disNumber"
                                    placeholder="Enter recipient number"
                                    value={disNumber}
                                    onChange={(ev) => setDisNumber(ev.target.value)}
                                />
                            </div>

                            {/* Message */}
                            <div className="w-100 flex flex-col flex-left mb-2">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    required
                                    id="message"
                                    placeholder="Enter your message"
                                    value={message}
                                    onChange={(ev) => setMessage(ev.target.value)}
                                />
                            </div>

                            {/* Provider */}
                            <div className="w-100 flex flex-col flex-left mb-2">
                                <label htmlFor="provider">Provider</label>
                                <select
                                    required
                                    id="provider"
                                    value={provider}
                                    onChange={(ev) => setProvider(ev.target.value)}
                                >
                                    <option value="Bulk_SMS_BD">Bulk SMS BD</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`submit-button ${loading ? "bg-gray-400 cursor-not-allowed" : ""}`}
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </main>
    );
}
