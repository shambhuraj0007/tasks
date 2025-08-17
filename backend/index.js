const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

// Test route
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Body parser
app.use(bodyParser.json());

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://tasks-xi-rosy.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle preflight requests globally
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));

// Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
