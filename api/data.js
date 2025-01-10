import { Prayer } from '../models/Prayer';
import { News } from '../models/News';

export default async function handler(req, res) {
  try {
    const prayerTimings = await Prayer.findOne() || new Prayer();
    const Notice = await News.findOne() || new News();
    res.json({ prayerTimings, Notice });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
}
