// api/login.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {Admin} from '../models/admin' // Ensure you have your models defined elsewhere

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) return res.status(401).json({ message: 'Invalid username or password' });

      if (password !== admin.password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const token = jwt.sign({ username: admin.username }, process.env.SECRET_KEY, { expiresIn: '2h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
