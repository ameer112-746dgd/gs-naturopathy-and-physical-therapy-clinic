const mongoose = require('mongoose'); // This was the missing line!

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { 
        type: String, 
        enum: [
            'Medications / Health Products', 
            'Mobility Aids', 
            'Therapy Equipment / Machines', 
            'Others'
        ], 
        default: 'Others' 
    },
    inStock: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', ProductSchema);