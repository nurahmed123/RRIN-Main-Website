import { withCors, readJsonFile } from '../../../lib/apiHelpers';

const handler = (req, res) => {
    const data = readJsonFile('../pages/api/scrapyard/data/silver.json');
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(500).json({ error: "Failed to read silver.json" });
    }
};

export default withCors(handler);