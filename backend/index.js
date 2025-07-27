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

app.use(
  cors({
    origin: "http://localhost:5174",
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
