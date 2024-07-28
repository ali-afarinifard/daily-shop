const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    images: [{ type: String }],
    // properties: { type: Map, of: String },  // Ensure this matches your properties format
    stock: { type: Number, required: true },
    isStatus: { type: Boolean, default: false },
    sizes: [{ type: Number }]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
