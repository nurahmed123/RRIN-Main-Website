import { mongooseConnect } from "@/lib/mongoose";
import { Scrapyard } from "@/models/Scrapyard";

export default async function handle(req, res) {
    try {
        // CORS Headers - adjust as needed for your deployment
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }

        // Connect to MongoDB
        await mongooseConnect();
        const { method } = req;

        switch (method) {
            case 'POST': {
                const { image, name, url, type, time, event } = req.body;
                const newDoc = await Scrapyard.create({ image, name, url, type, time, event });
                return res.status(201).json(newDoc);
            }

            case 'GET': {
                const { type } = req.query;
                // If no type is provided, return a welcome message (or all docs, depending on your needs)
                if (!type) {
                    return res.status(200).json({ success: "Welcome!" });
                }
                // Ensure type is a string.
                const typeParam = Array.isArray(type) ? type.join('') : type;
                const docs = await Scrapyard.find({ type: typeParam });
                return res.status(200).json(docs);
            }

            case 'PUT': {
                const { _id, image, name, url, type, time, event } = req.body;
                if (!_id) {
                    return res.status(400).json({ error: "Missing _id in request" });
                }
                const updatedDoc = await Scrapyard.findByIdAndUpdate(
                    _id,
                    { image, name, url, type, time, event },
                    { new: true }
                );
                if (!updatedDoc) {
                    return res.status(404).json({ error: "Record not found" });
                }
                return res.status(200).json(updatedDoc);
            }

            case 'DELETE': {
                const { _id } = req.query;
                if (!_id) {
                    return res.status(400).json({ error: "Missing _id in request" });
                }
                const deletedDoc = await Scrapyard.findByIdAndDelete(_id);
                if (!deletedDoc) {
                    return res.status(404).json({ error: "Record not found" });
                }
                return res.status(200).json({ success: true });
            }

            default: {
                res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
                return res.status(405).json({ error: `Method ${method} not allowed` });
            }
        }
    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }
}
