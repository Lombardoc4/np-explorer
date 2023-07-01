import { createPark } from '../lib/redis.js';

export default async function handler(req, res) {
    const id = await createPark(req.body);
    
    res.status(200).json({ id });
}