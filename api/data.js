import {Prayer} from '../models/prayer';
import {News} from '../models/news';
import connectDB from '../db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
          await connectDB(); // Ensure DB connection before querying
    
          // Fetch prayer timings from MongoDB
          const prayerTimings = await Prayer.findOne();
          const Notice = await News.findOne() || new Prayer();
          res.status(200).json({ prayerTimings , Notice });
        } catch (err) {
          res.status(500).json({ message: 'Error fetching prayer timings', error: err.message });
        }
      } else {
        res.status(405).json({ message: 'Method Not Allowed' });
      }
    }