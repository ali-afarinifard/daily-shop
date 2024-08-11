// src/routes/user.js

const express = require('express');
const { getUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.get('/me', authMiddleware, getUser);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
