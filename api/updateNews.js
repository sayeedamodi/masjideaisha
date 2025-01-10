import { News } from '../models/News';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { title, content } = req.body;
      const news = await News.findOne();
      if (!news) return res.status(404).json({ message: 'News not found' });

      news.title = title;
      news.content = content;
      news.createdAt = Date.now();

      await news.save();
      res.json({ message: 'Latest news updated successfully', news });
    } catch (err) {
      res.status(500).json({ message: 'Error updating latest news', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
