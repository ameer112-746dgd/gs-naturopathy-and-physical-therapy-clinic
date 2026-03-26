require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');
const Product = require('./models/Product');

const services = [
    { 
        name: "Physical therapy", 
        description: "Professional restoration of movement and function through expert physical techniques and rehabilitation exercises." 
    },
    { 
        name: "Home service (home treatment visits)", 
        description: "Bringing professional clinical therapy and diagnostic tools to the comfort of your residence for maximum convenience." 
    },
    { 
        name: "Massage therapy (in-office)", 
        description: "Therapeutic deep tissue and relaxation massage performed at our clinical facility to relieve pain and reduce stress." 
    }
];

const products = [
    { name: "Meridian Machine", price: "Contact for Price" },
    { name: "Blood Circulation Machine", price: "Contact for Price" },
    { name: "Walking Stick", price: "Contact for Price" },
    { name: "Wheelchair", price: "Contact for Price" }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing data
        await Service.deleteMany({});
        await Product.deleteMany({});
        console.log("Old data cleared.");

        // Insert new data
        await Service.insertMany(services);
        await Product.insertMany(products);
        
        console.log("✅ Database Successfully Seeded!");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    } finally {
        mongoose.connection.close();
        process.exit();
    }
};

seedDB();