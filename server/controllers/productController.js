const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteMultipleProducts = async (req, res) => {
    try {
        const { ids } = req.body;
        await Product.deleteMany({ _id: { $in: ids } });
        res.json({ message: "Products deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.bulkDeleteProducts = async (req, res) => {
    try {
        const { ids } = req.body; // Getting the list of IDs from the frontend
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: "Invalid IDs provided" });
        }
        
        await Product.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: "Products deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};