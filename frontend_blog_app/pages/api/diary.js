import { mongooseConnect } from "@/lib/mongoose";
import { Diary } from "@/models/Diary";

export default async function handle(req, res) {
    
       // If authenticated, connect to MongoDB
    await mongooseConnect();
    
    const { method } = req;


    if (method === 'POST') {
        const { userid, username, debitted, creditted, reason, note, cost } = req.body;
        // console.log(author)
        // console.log(title)
        // console.log(description)

        const productDoc = await Diary.create({
            userid, username, debitted, creditted, reason, note, cost
        })

        res.json(productDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Diary.findById(req.query.id));
        } else {
            res.json((await Diary.find()).reverse())
        }
    }


    if (method === 'PUT') {
        const { _id, userid, username, debitted, creditted, reason, note, cost } = req.body;
        await Diary.updateOne({ _id }, {
            userid, username, debitted, creditted, reason, note, cost
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Diary.deleteOne({ _id: req.query?.id });
            res.json(true)
        }
    }
}