import { mongooseConnect } from "@/lib/mongoose";
import { Achievement } from "@/models/Achievement";

export default async function handle(req, res) {
    
       // If authenticated, connect to MongoDB
    await mongooseConnect();
    
    const { method } = req;


    if (method === 'POST') {
        const { title, slug, description, achievementcategory, tags, status } = req.body;

        const productDoc = await Achievement.create({
            title, slug, description, achievementcategory, tags, status
        })

        res.json(productDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Achievement.findById(req.query.id));
        } else {
            res.json((await Achievement.find()).reverse())
        } 
    }


    if (method === 'PUT') {
        const { _id, title, slug, description, achievementcategory, tags, status } = req.body;
        await Achievement.updateOne({ _id }, {
            title, slug, description, achievementcategory, tags, status
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Achievement.deleteOne({ _id: req.query?.id });
            res.json(true)
        }
    }
}