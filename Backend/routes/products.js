const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');


// ** POST Products
router.post('/', async (req, res) => {
    try {
        const { title, description, price, category, stock, isStatus, colors, sizes, gender, offer, images } = req.body;

        const product = new Product({
            title,
            description,
            price,
            category,
            images, // Array of image URLs from Firebase Storage
            stock,
            isStatus,
            colors,
            sizes,
            gender,
            offer
        });

        console.log("Backend Product =>", { product })

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error); // Enhanced error logging
        res.status(500).json({ message: 'Internal server error', error });
    }
});


// ** GET Products
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;

        let filter = {};

        // if (category) {
        //     filter.category = category; // If category is provided, add it to the filter
        // }

        if (category) {
            // Find all parent categories recursively
            const categoryIds = await getAllCategoryIdsWithParents(category);
            filter.category = { $in: categoryIds };
        }

        const products = await Product.find(filter).populate('category');
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Helper function to get all category IDs, including parents recursively
async function getAllCategoryIdsWithParents(categoryId) {
    const category = await Category.findById(categoryId);
    let categories = [categoryId];

    if (category && category.parent) {
        const parentCategories = await getAllCategoryIdsWithParents(category.parent);
        categories = categories.concat(parentCategories);
    }

    return categories;
}



// ** GET Product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({
            ...product.toObject()
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// ** Get Products by category
router.get('/products/:category', async (req, res) => {
    const category = req.params.category.toLowerCase(); // Get category from the URL
    try {
        const products = await Product.find({ category: category });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});



// ** PUT Product
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// ** DELETE Products
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


module.exports = router;
