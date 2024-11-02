import { mongooseConnect } from "@/lib/mongoose";
import { Drive } from "@/models/Drive";

export default async function handle(req, res) {
    
       // If authenticated, connect to MongoDB
    await mongooseConnect();
    
    const { method } = req;


    if (method === 'POST') {
        const { url, name } = req.body;

        const productDoc = await Drive.create({
            url, name
        })

        res.json(productDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Drive.findById(req.query.id));
        } else {
            res.json((await Drive.find()).reverse())
        }
    }


    if (method === 'PUT') {
        const { _id, url, name } = req.body;
        await Drive.updateOne({ _id }, {
            url, name
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Drive.deleteOne({ _id: req.query?.id });
            res.json(true)
        }
    }
}