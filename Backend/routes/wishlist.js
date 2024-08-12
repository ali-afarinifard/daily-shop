// routes/wishlist.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');

// Add a product to wishlist
router.post('/wishlist/add', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product is already in the wishlist
        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        user.wishlist.push(productId);
        await user.save();

        res.status(200).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});



// Remove a product from wishlist
router.post('/wishlist/remove', async (req, res) => {

    const { userId, productId } = req.body;

    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.wishlist = user.wishlist.filter(id => id.toString() !== productId);

        await user.save();

        res.status(200).json({ message: 'Product removed from wishlist', wishlist: user.wishlist });
        
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});



// Get user's wishlist
router.get('/wishlist/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('wishlist'); // Populate wishlist with product details
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.wishlist);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
