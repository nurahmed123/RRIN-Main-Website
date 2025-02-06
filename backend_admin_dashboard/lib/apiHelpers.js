import fs from 'fs';
import path from 'path';

export function readJsonFile(filename) {
    const filePath = path.join(process.cwd(), 'data', filename);
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filename}:`, error);
        return null;
    }
}

export function withCors(handler) {
    return (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }
        
        return handler(req, res);
    };
}