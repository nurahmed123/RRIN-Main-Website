import { mongooseConnect } from "@/lib/mongoose";
import { Member } from "@/models/Member";

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            // Fetch a single blog by id
            const members = await Member.findById(req.query.id);
            res.json(members);
        } else if (req.query?.role) {
            // Fetch members by role
            const members = await Member.find({ role: req.query.role });
            res.json(members.reverse());
        } else if (req.query?.email) {
            // Fetch members by role
            const members = await Member.find({ tags: req.query.email });
            res.json(members.reverse());
        } else if (req.query?.phone) {
            // Fetch members by bcategory
            const members = await Member.find({ slug: req.query.phone });
            res.json(members.reverse());
        } else {
            // Fetch all members
            const members = await Member.find();
            res.json(members.reverse());
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
