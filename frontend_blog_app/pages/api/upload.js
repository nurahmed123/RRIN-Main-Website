import formidable from 'formidable';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { uploadFile } from '../../utils/uploadFile'; // custom function for uploading to S3 or other storage

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: 'Formidable Error' });
            return;
        }

        const { filepath, originalFilename } = files.file;
        const fileStream = fs.createReadStream(filepath);

        try {
            const imageUrl = await uploadFile(fileStream, originalFilename); // upload to S3 or another storage
            res.status(200).json({ url: imageUrl });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Upload Failed' });
        }
    });
};
