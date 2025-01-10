import { Admin } from "../models/admin";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error registering admin', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}