const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB();

// CORS Policy - Allowing your specific domains
app.use(cors({
    origin: [
        'https://gs-clinic-frontend.onrender.com', 
        'https://gsnaturopathyandphysicaltherapyclinic.com',
        'https://www.gsnaturopathyandphysicaltherapyclinic.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health Check Route (to test if backend is awake)
app.get('/api', (req, res) => res.send("GS Clinic API is running..."));

// Routes
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));