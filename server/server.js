const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// 1. Connect Database
connectDB();

// 2. Middleware
app.use(cors());

// --- UPDATE THESE TWO LINES BELOW ---
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// -------------------------------------

// 3. Routes
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 10000;

// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));