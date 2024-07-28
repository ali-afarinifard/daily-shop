const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// // Create a new category
// router.post('/', async (req, res) => {
//     const { name, parent, properties } = req.body;

//     try {
//         const newCategory = new Category({
//             name,
//             parent: parent || null,
//             properties: properties || []
//         });

//         await newCategory.save();
//         res.status(201).json(newCategory);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Get all categories
// router.get('/', async (req, res) => {
//     try {
//         // const categories = await Category.find().populate('parent');
//         const categories = await Category.find();
//         res.json(categories);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Get a single category
// router.get('/:id', async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id).populate('parent');
//         if (!category) return res.status(404).json({ error: 'Category not found' });
//         res.json(category);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Update a category
// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name, parent, properties } = req.body;

//     try {
//         const updatedCategory = await Category.findByIdAndUpdate(
//             id,
//             { name, parent: parent || null, properties: properties || [] },
//             { new: true }
//         );

//         if (!updatedCategory) {
//             return res.status(404).json({ message: 'Category not found' });
//         }

//         res.json(updatedCategory);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Delete a category
// router.delete('/:id', async (req, res) => {
//     try {
//         const category = await Category.findByIdAndDelete(req.params.id);
//         if (!category) return res.status(404).json({ error: 'Category not found' });
//         res.json({ message: 'Category deleted' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });



// ** New Routes__________________________________

// Create a new category
router.post('/', async (req, res) => {
    const { name, parent } = req.body;

    try {
        const newCategory = new Category({
            name,
            parent: parent || null,
        });

        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        // const categories = await Category.find().populate('parent');
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single category
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('parent');
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a category
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, parent } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, parent: parent || null },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
