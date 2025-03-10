import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "MasjideAishadb" ;
const { sign } = jwt;
// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    console.log("Token received:", token);
    console.log("SECRET_KEY:", SECRET_KEY);// Extract token from "Bearer token"
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error('JWT Error:', err);
        const decoded = jwt.decode(token, { complete: true });
        console.log(decoded);
        return res.status(401).json({ message: 'Invalid or expired token msg from server' });
      }
      req.user = decoded;
      
 // Attach decoded user data to the request object
      next(); // Proceed to the next middleware or route handler
    });
  };

const { Schema, model } = mongoose;
// Admin schema and model
const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Admin = model('Admin', adminSchema);

// Prayer Timings schema and model
const prayerSchema = new Schema({
  fajr: {
    azanTime: { type: String, default: '5:30 AM' },
    prayerTime: { type: String, default: '5:15 AM' },
  },
  zuhr: {
    azanTime: { type: String, default: '1:00 PM' },
    prayerTime: { type: String, default: '12:45 PM' },
  },
  asr: {
    azanTime: { type: String, default: '4:30 PM' },
    prayerTime: { type: String, default: '4:15 PM' },
  },
  maghrib: {
    azanTime: { type: String, default: '6:45 PM' },
    prayerTime: { type: String, default: '6:30 PM' },
  },
  isha: {
    azanTime: { type: String, default: '8:00 PM' },
    prayerTime: { type: String, default: '7:45 PM' },
  },
  jumuah: {
    azanTime: { type: String, default: '8:00 PM' },
    prayerTime: { type: String, default: '7:45 PM' },
  },
  createdAt: { type: Date, default: Date.now() },
});

const Prayer = model('Prayer', prayerSchema);

// News schema and model (updated to include title, content, and createdAt)
const newsSchema = new Schema({
  title: { type: String, required: true, default: 'Latest News' },
  content: { type: String, required: true, default: 'Welcome to the masjid!' },
  createdAt: { type: Date, default: Date.now() },
});

const News = model('News', newsSchema);





// Admin registration (for setup purposes only)
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering admin', error: err.message });
  }
});

// Admin login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid username or password' });

    if (password !== admin.password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    const token = sign({ username: admin.username }, SECRET_KEY, { expiresIn: '2h' });
    console.log("SECRET_KEY:", SECRET_KEY);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// Fetch prayer timings and latest news (admin only)
app.get('/data', async (req, res) => {
    try {
      const prayerTimings = await Prayer.findOne() || new Prayer();
      const Notice = await News.findOne() || new News();
      res.json({ prayerTimings , Notice}); // Only send the prayerTimings object to the frontend
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
  });
  
app.get('/notice', async (req, res) => {
    try {
      const Notice = await News.findOne() || new Prayer();
      res.json({ Notice }); 
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data', error: err.message });
    }
  });
  
// Update prayer timings (admin only)
app.put('/update/time', verifyToken, async (req, res) => {
    try {
      const { 
        fajr, 
        zuhr, 
        asr, 
        maghrib, 
        isha, 
        jumuah 
      } = req.body; // Extract all fields including Jumuah
  
      const prayerTimings = await Prayer.findOne();
      if (!prayerTimings) {
        return res.status(404).json({ message: 'Prayer timings not found' });
      }
  
      // Update Azan and Prayer Time for each prayer
      prayerTimings.fajr = { azanTime: fajr.azanTime, prayerTime: fajr.prayerTime };
      prayerTimings.zuhr = { azanTime: zuhr.azanTime, prayerTime: zuhr.prayerTime };
      prayerTimings.asr = { azanTime: asr.azanTime, prayerTime: asr.prayerTime };
      prayerTimings.maghrib = { azanTime: maghrib.azanTime, prayerTime: maghrib.prayerTime };
      prayerTimings.isha = { azanTime: isha.azanTime, prayerTime: isha.prayerTime };
      prayerTimings.jumuah = { azanTime: jumuah.azanTime, prayerTime: jumuah.prayerTime };
      prayerTimings.createdAt =  Date.now();
      await prayerTimings.save();
      res.json({ message: 'Prayer timings updated successfully', prayerTimings });
    } catch (err) {
      res.status(500).json({ message: 'Error updating prayer timings', error: err.message });
    }
  });
  
// Update news (admin only)
app.put('/update/news', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const news = await News.findOne();
    if (!news) return res.status(404).json({ message: 'News not found' });

    news.title = title;
    news.content = content;
    news.createdAt = Date.now(); // Update the timestamp to the current time

    await news.save();
    res.json({ message: 'Latest news updated successfully', news });
  } catch (err) {
    res.status(500).json({ message: 'Error updating latest news', error: err.message });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the path to the donationSettings.json file
const settingsFile = path.join(__dirname, 'donationsettings.json');
const showAnnouncementFile = path.join(__dirname, 'showAnnouncement.json');
console.log(settingsFile);

fs.readFile(settingsFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read settings file:', err);
    return;
  }
  try {
    const settings = JSON.parse(data);
    console.log(settings);
  } catch (parseError) {
    console.error('Failed to parse JSON:', parseError);
  }
});

if (fs.existsSync(settingsFile)) {
  console.log('File exists');
} else {
  console.log('File not found');
}
// Endpoint to get current settings
app.get("/api/donation-settings", (req, res) => {
  try {
    const data = fs.readFileSync(settingsFile, "utf8");
    res.status(200).json(JSON.parse(data));
    if (err) {
      console.error('Failed to read settings file:', err);
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to read settings file" });
    console.log(settingsFile);
  }
});

//to get show hide 
app.get("/api/showhideannouncement" , (req , res)=>{
  try {
    const data = fs.readFileSync(showAnnouncementFile, "utf8");
    res.status(200).json(JSON.parse(data));
    if(err){
      console.log('Failed to read show hide settings file:', err);
      return;
    }
  } catch(error){
    res.status(500).json({message : "failed to read settings file"});
    console.log(showAnnouncementFile);
  }
})
// Endpoint to update settings
app.put("/api/donation-settings",verifyToken, (req, res) => {
  const { upiId, imageUrl } = req.body;

  if (!upiId || !imageUrl) {
    return res.status(400).json({ message: "UPI ID and Image URL are required" });
  }

  const updatedData = {
    upiId,
    imageUrl,
    updatedAt: new Date().toISOString(),
  };

  try {
    fs.writeFileSync(settingsFile, JSON.stringify(updatedData, null, 2));
    res.status(200).json({ message: "Settings updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update settings file" });
  }
});

app.put("/api/showhideannouncement", verifyToken , (req,res)=> {
  const { showAnnouncement } = req.body;
  const updatedData = {
    showAnnouncement
  };
  try {
    fs.writeFileSync(showAnnouncementFile, JSON.stringify(updatedData, null, 2));
    res.status(200).json({message: "display preference changed"});
    } catch (error) {
      res.status(500).json({message: "Failed to update show hide settings file"});
  }
})
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

