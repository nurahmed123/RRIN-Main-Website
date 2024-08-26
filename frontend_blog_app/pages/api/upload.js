// pages/api/upload.js
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        form.uploadDir = uploadDir;
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to upload image.' });
            }

            const filePath = files.file.path.replace(process.cwd(), '');
            return res.status(200).json({ url: filePath });
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
