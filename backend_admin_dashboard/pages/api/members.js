import { mongooseConnect } from "@/lib/mongoose";
import { Member } from "@/models/Member";

export default async function handle(req, res) {

    // If authenticated, connect to MongoDB
    await mongooseConnect();

    const { method } = req;


    if (method === 'POST') {
        const { name, role, department, phone, email, linkedin, github, facebook, instagram, youtube, twitter, status, image } = req.body;

        const productDoc = await Member.create({
            name, role, department, phone, email, linkedin, github, facebook, instagram, youtube, twitter, status, image
        })

        res.json(productDoc)
    }

    // if (method === 'GET') {
    //     if (req.query?.id) {
    //         res.json(await Member.findById(req.query.id));
    //     } else {
    //         res.json((await Member.find()).reverse())
    //     }
    // }

    if (method === 'GET') {
        const { id, status } = req.query;
        const filter = id ? { _id: id } : status ? { status } : {};
    
        const result = id ? await Member.findOne(filter) : await Member.find(filter).sort({ _id: -1 });
    
        res.json(result || (id ? {} : []));
    }
    



    if (method === 'PUT') {
        const { _id, name, role, department, phone, email, linkedin, github, facebook, instagram, youtube, twitter, status, image } = req.body;
        await Member.updateOne({ _id }, {
            name, role, department, phone, email, linkedin, github, facebook, instagram, youtube, twitter, status, image
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Member.deleteOne({ _id: req.query?.id });
            res.json(true)
        }
    }
}