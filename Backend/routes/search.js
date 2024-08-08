// backend/routes/search.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assuming you have a Product model

// Route to handle search queries
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.json([]); // Return an empty array if the query is empty
        }

        // Find products matching the search term in the title
        const products = await Product.find({ title: { $regex: query, $options: 'i' } }).limit(10);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error while searching products' });
    }
});

module.exports = router;
