import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true, default: 'Latest News' },
  content: { type: String, required: true, default: 'Welcome to the masjid!' },
  createdAt: { type: Date, default: Date.now },
});

const News = mongoose.models.News || mongoose.model('News', newsSchema);

export { News };

