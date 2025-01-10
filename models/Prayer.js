import mongoose from 'mongoose';

const prayerSchema = new mongoose.Schema({
  fajr: { azanTime: String, prayerTime: String },
  zuhr: { azanTime: String, prayerTime: String },
  asr: { azanTime: String, prayerTime: String },
  maghrib: { azanTime: String, prayerTime: String },
  isha: { azanTime: String, prayerTime: String },
  jumuah: { azanTime: String, prayerTime: String },
});

const Prayer = mongoose.models.Prayer || mongoose.model('Prayer', prayerSchema);

export { Prayer };