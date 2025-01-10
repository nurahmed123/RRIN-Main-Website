import { mongooseConnect } from "@/lib/mongoose";
import { HackClub } from "@/models/HackClub";
import { validateInput } from "@/lib/inputValidation";

export default async function handle(req, res) {
    try {
        // Connect to MongoDB
        await mongooseConnect();

        const { method } = req;

        switch (method) {
            case 'POST': {
                const { name, code, os, system, release, count } = req.body;

                // Validate inputs
                if (!validateInput({ name, code, os, system, release, count })) {
                    return res.status(400).json({ error: "Invalid input data" });
                }

                // Create a new HackClub document
                const productDoc = await HackClub.create({ name, code, os, system, release, count });
                return res.status(201).json(productDoc);
            }

            case 'GET': {
                const { name } = req.query;
            
                // Check if 'name' is undefined
                if (name === undefined) {
                    return res.status(400).json({ error: "Name query parameter is required" });
                }
            
                // Ensure name is a string, not an array
                const nameParam = Array.isArray(name) ? name.join('') : name;
            
                // Fetch record by name
                const product = await HackClub.findOne({ name: nameParam });
            
                if (!product) {
                    return res.status(404).json({ error: "Record not found" });
                } else {
                    // Increment the count field by 1
                    product.count += 1;
                    
                    // Save the updated document
                    const updatedProduct = await product.save();
            
                    return res.status(200).json(updatedProduct);
                }
            }

            case 'PUT': {
                const { name, code, os, system, release, count } = req.body;

                if (!validateInput({ name, code, os, system, release, count })) {
                    return res.status(400).json({ error: "Invalid input data" });
                }

                // Update the document based on name (assuming name is unique)
                const updatedDoc = await HackClub.findOneAndUpdate(
                    { name }, // Use `name` as the unique identifier
                    { name, code, os, system, release, count },
                    { new: true } // Return the updated document
                );

                if (!updatedDoc) {
                    return res.status(404).json({ error: "Record not found" });
                }

                return res.status(200).json(updatedDoc);
            }

            case 'DELETE': {
                const { name } = req.query;

                if (!name) {
                    return res.status(400).json({ error: "Missing name in request" });
                }

                // Delete the document based on name
                const deletedDoc = await HackClub.findOneAndDelete({ name });

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
