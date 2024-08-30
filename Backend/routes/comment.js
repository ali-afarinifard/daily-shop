const express = require('express');
const Comment = require('../models/Comment');
const Product = require('../models/Product');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// ** POST Comment
router.post('/comment/add', async (req, res) => {
    const { userId, productId, content } = req.body;

    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const comment = new Comment({
            user: userId,  // Ensure you're using userId from req.body
            product: productId,
            content,
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



// ** GET Comments for a Product
router.get('/comments/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const comments = await Comment.find({ product: productId }).populate('user', 'fullName username');

        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;