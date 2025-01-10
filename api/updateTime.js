import { Prayer } from '../models/prayer';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { fajr, zuhr, asr, maghrib, isha, jumuah } = req.body;

      const prayerTimings = await Prayer.findOne();
      if (!prayerTimings) {
        return res.status(404).json({ message: 'Prayer timings not found' });
      }

      prayerTimings.fajr = { azanTime: fajr.azanTime, prayerTime: fajr.prayerTime };
      prayerTimings.zuhr = { azanTime: zuhr.azanTime, prayerTime: zuhr.prayerTime };
      prayerTimings.asr = { azanTime: asr.azanTime, prayerTime: asr.prayerTime };
      prayerTimings.maghrib = { azanTime: maghrib.azanTime, prayerTime: maghrib.prayerTime };
      prayerTimings.isha = { azanTime: isha.azanTime, prayerTime: isha.prayerTime };
      prayerTimings.jumuah = { azanTime: jumuah.azanTime, prayerTime: jumuah.prayerTime };

      await prayerTimings.save();
      res.json({ message: 'Prayer timings updated successfully', prayerTimings });
    } catch (err) {
      res.status(500).json({ message: 'Error updating prayer timings', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
