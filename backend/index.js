const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../backend/config/db.js');
const authRoutes = require('./Routes/auth.js');
const ownerRoutes = require('./Routes/ownerRoutes.js');
const seekerRoutes = require('./Routes/seekerRoutes.js');

// Load environment variables
dotenv.config();


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:5173',
  'https://frontend-qymqtv7bi-akshiti-gargs-projects.vercel.app',
  'https://frontend-ayhd4qqrt-akshiti-gargs-projects.vercel.app',
  'https://frontend-66mn0f79c-akshiti-gargs-projects.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use('/', authRoutes);
app.use('/owner', ownerRoutes);
app.use('/seeker', seekerRoutes);

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening");
});
