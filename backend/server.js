import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Event from './models/Event.js';
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';
import faqRoutes from './routes/faqRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://doorwaytodignityow251247.co.za',
  'https://www.doorwaytodignityow251247.co.za',
  'https://doorway-to-dignity-1.onrender.com',
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

app.get('/sitemap.xml', async (req, res) => {
  try {
    const base = 'https://www.doorwaytodignityow251247.co.za';

    const events = await Event.find().select('_id updatedAt date');

    const urls = [
      `<url><loc>${base}/</loc></url>`,
      `<url><loc>${base}/volunteer</loc></url>`,
      `<url><loc>${base}/faq</loc></url>`,
      `<url><loc>${base}/signup</loc></url>`,
      `<url><loc>${base}/login</loc></url>`,
      ...events.map((evt) => {
        const id = evt._id;
        const lastMod = evt.updatedAt
          ? evt.updatedAt.toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10);

        return `<url><loc>${base}/volunteer?event=${id}</loc><lastmod>${lastMod}</lastmod></url>`;
      }),
    ];

    res
      .type('application/xml')
      .send(
        '<?xml version="1.0" encoding="UTF-8"?>' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
          urls.join('') +
          '</urlset>'
      );
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).end();
  }
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
    app.get('/', (req, res) => {
      res.status(200).send('OK');
    });
    server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('DB Connection Error:', err);
    process.exit(1);
  });

process.on('SIGTERM', async () => {
  console.log('SIGTERM received: closing HTTP server');
  if (server) {
    server.close(async () => {
      console.log('HTTP server closed');
      try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
      } catch (err) {
        console.error('Error closing MongoDB connection', err);
        process.exit(1);
      }
    });
  }
});
