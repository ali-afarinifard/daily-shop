const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    images: [{ type: String }],
    stock: { type: Number, required: true },
    isStatus: { type: Boolean, default: false },
    womenSizes: [{ type: Number }],
    menSizes: [{ type: String }],
    colors: [{ type: String, required: true }]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
