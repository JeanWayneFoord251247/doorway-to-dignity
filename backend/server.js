import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';
import faqRoutes from './routes/faqRoutes.js'; 

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://doorwaytodignityow251247.co.za',
  'https://www.doorwaytodignityow251247.co.za',
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/faqs', faqRoutes);

const PORT = process.env.PORT || 8080; 
const MONGO_URI = process.env.MONGO_URI;

let server;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('DB Connection Error:', err);
    process.exit(1);
  });

process.on('SIGTERM', () => {
  console.log('SIGTERM received: closing HTTP server');
  if (server) {
    server.close(() => {
      console.log('HTTP server closed');
      mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed');
        process.exit(0);
      });
    });
  }
});