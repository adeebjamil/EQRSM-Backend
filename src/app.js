const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const employeeRoutes = require('./routes/employeeRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize express
const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;