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
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight OPTIONS request for all routes
app.options('*', cors(corsOptions));



// Routes
app.use('/', authRoutes);
app.use('/owner', ownerRoutes);
app.use('/seeker', seekerRoutes);

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening");
});
