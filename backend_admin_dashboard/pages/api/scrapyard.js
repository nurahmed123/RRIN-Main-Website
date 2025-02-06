import { mongooseConnect } from "@/lib/mongoose";
import { Scrapyard } from "@/models/Scrapyard";

export default async function handle(req, res) {
    try {
        // Connect to MongoDB
        await mongooseConnect();
        const { method } = req;

        switch (method) {
            case 'POST': {
                // Destructure the fields from the request body.
                const { image, name, url, type, time, event } = req.body;

                // Create a new Partner document.
                const newDoc = await Scrapyard.create({ image, name, url, type, time, event });
                return res.status(201).json(newDoc);
            }

            case 'GET': {
                const { type } = req.query;
                // console.log("Received type:", type);

                // If no type is provided, you could choose to return all documents
                // or a welcome message. Here, we return a welcome message.
                if (!type) {
                    return res.status(200).json({ success: "Welcome!" });
                }

                // Ensure type is a string (if it's an array, join its elements).
                const typeParam = Array.isArray(type) ? type.join('') : type;

                // Perform a database lookup using the type field.
                const docs = await Scrapyard.find({ type: typeParam });
                return res.status(200).json(docs);
            }

            case 'PUT': {
                // For updates, require the _id along with other fields.
                const { _id, image, name, url, type, time, event } = req.body;

                if (!_id) {
                    return res.status(400).json({ error: "Missing _id in request" });
                }

                // Update the document using the _id.
                const updatedDoc = await Scrapyard.findByIdAndUpdate(
                    _id,
                    { image, name, url, type, time, event },
                    { new: true } // Return the updated document.
                );

                if (!updatedDoc) {
                    return res.status(404).json({ error: "Record not found" });
                }

                return res.status(200).json(updatedDoc);
            }

            case 'DELETE': {
                // For deletion, require the _id from the query string.
                const { _id } = req.query;

                if (!_id) {
                    return res.status(400).json({ error: "Missing _id in request" });
                }

                // Delete the document using the _id.
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
