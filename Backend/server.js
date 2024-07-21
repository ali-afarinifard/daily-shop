const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const uploadRoutes = require('./routes/uploads');

// app.get('/api/protected', protect, (req, res) => {
//     res.json({ message: 'You are authorized', user: req.user });
// });

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api', uploadRoutes);

// Check the Server Logs
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Root route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Failed to connect to MongoDB', err);
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
