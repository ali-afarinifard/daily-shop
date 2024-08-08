const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
// const dotenv = require('dotenv');
require('dotenv').config();

// dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Import routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const uploadRoutes = require('./routes/uploads');
const searchRoutes = require('./routes/search');
const wishlistRoutes = require('./routes/wishlist');

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
// **! Check & Fix it later..... (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('uploads'));
app.use('/api', uploadRoutes);
app.use('/api', searchRoutes);
app.use('/api', wishlistRoutes);

// Root route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
