import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function Sendsms({
    _id,
    securitycode: existingSecuritycode = "",
    subject: existingSubject = "",
    disNumber: existingDisNumber = "",
    message: existingMessage = "",
    provider: existingProvider = "Bulk_SMS_BD",
}) {
    const { data: session, status } = useSession();
    const router = useRouter();


    if (!session) {
        router.push('/login');
        return null; // Return null or any loading indicator while redirecting
    }
    if (status === "loading") {
        // Loading state, loader or any other indicator
        return <div className='full-h flex flex-center'>
            <div className="loading-bar">Loading</div>
        </div>;
    }

    // State Variables
    const [securitycode, setSecuritycode] = useState(existingSecuritycode);
    const [subject, setSubject] = useState(existingSubject);
    const [disNumber, setDisNumber] = useState(existingDisNumber);
    const [message, setMessage] = useState(existingMessage);
    const [provider, setProvider] = useState(existingProvider);
    const [loading, setLoading] = useState(false); // Added this line

    // Data Mappings
    const topSecuritycode = { 580477: "NUR" };
    const useridList = { 580477: "8809617618206" };
    const defaultSenderId = "8809617618206";
    const defaultAuthor = "NUR";

    // Derived States
    const [author, setAuthor] = useState(
        topSecuritycode[existingSecuritycode] || "default"
    );
    const [senderid, setSenderid] = useState(
        useridList[existingSecuritycode] || "defaultSenderId"
    );

    useEffect(() => {
        // Dynamically update `author` and `senderid` based on `securitycode`
        setAuthor(topSecuritycode[securitycode] || "default");
        setSenderid(useridList[securitycode] || "defaultSenderId");
    }, [securitycode]);

    // Form Submit Handler
    async function sendMessage(ev) {
        ev.preventDefault();
        setLoading(true);

        try {
            const data = {
                url: "http://bulksmsbd.net/api/smsapi",
                senderid: defaultSenderId || senderid,
                apiKey: process.env.NEXT_PUBLIC_Bulk_SMS_BD_NUR_API,
                number: disNumber,
                message: message.trim(),
            };
            // const data = {
            //     senderid: defaultSenderId || senderid,
            //     apiKey: process.env[`${provider}_${author || "default"}_API`],
            //     number: disNumber,
            //     message: message.trim(),
            // };
            // console.log("Sending data:", data); // Log the data being sent

            const response = await axios.post(`http://bulksmsbd.net/api/smsapi?api_key=${process.env.NEXT_PUBLIC_Bulk_SMS_BD_NUR_API}&type=text&number=${disNumber}&senderid=8809617618206&message=${message}`);
            // const response = await axios.post("http://bulksmsbd.net/api/smsapi", data);
            console.log("Response:", response); // Log the API response

            toast.success("Message Sent Successfully!");
            router.push("/sendsms");
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (session) {
        return <>
            <main className="blogsadd">
                <div className="addblogspage">
                    <form onSubmit={sendMessage} className="addWebsiteform">
                        {/* Security Code */}
                        <div className="w-100 flex flex-col flex-left mb-2">
                            <label htmlFor="securitycode">Security Code</label>
                            <input
                                required
                                type="number"
                                id="securitycode"
                                placeholder="Enter your security code"
                                value={securitycode}
                                onChange={(ev) => setSecuritycode(ev.target.value)}
                            />
                        </div>
                        {securitycode === "580477" &&
                            <div>
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
                            </div>
                        }
                    </form>
                </div>
            </main>
        </>
    }
}
