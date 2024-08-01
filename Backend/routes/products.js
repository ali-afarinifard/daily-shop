const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


// // ** POST Products
// router.post('/', async (req, res) => {
//     try {
//         const { title, description, price, category, images, properties, stock, isStatus } = req.body;

//         const product = new Product({
//             title,
//             description,
//             price,
//             category,
//             images,
//             properties,
//             stock,
//             isStatus
//         });

//         console.log("Backend Product =>", { product })

//         await product.save();
//         res.status(201).json(product);
//     } catch (error) {
//         console.error('Error creating product:', error); // Enhanced error logging
//         res.status(500).json({ message: 'Internal server error', error });
//     }
// });


// // ** GET Products
// router.get('/', async (req, res) => {
//     try {
//         const products = await Product.find().populate('category');
//         res.json(products);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


// // ** GET Product by ID
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const product = await Product.findById(id).populate('category');
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json({
//             ...product.toObject(),
//             properties: product.properties || {}
//         });
//     } catch (error) {
//         console.error('Error fetching product:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });



// ** PUT Products
// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name, description, price, category, properties, stock, images, isStatus } = req.body;

//     try {
//         let product = await Product.findById(id);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         product.name = name;
//         product.description = description;
//         product.price = price;
//         product.category = category;
//         product.properties = properties;
//         product.stock = stock;
//         product.images = images;
//         product.isStatus = isStatus;

//         await product.save();
//         res.json(product);
//     } catch (error) {
//         console.error('Error updating product:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const updatedProduct = req.body;

//     try {
//         const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });



// // ** DELETE Products
// router.delete('/:id', async (req, res) => {
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json({ message: 'Product deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// });



// ** New Routes__________________________________


// ** POST Products
router.post('/', async (req, res) => {
    try {
        const { title, description, price, category, images, stock, isStatus, colors, sizes, gender } = req.body;

        const product = new Product({
            title,
            description,
            price,
            category,
            images,
            stock,
            isStatus,
            colors,
            sizes,
            gender
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
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


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
