// src/controllers/userController.js

const User = require('../models/User');

const getUser = async (req, res) => {
  const userId = req.user.userId; // Get userId from the token
  try {
    const user = await User.findById(userId).select('-password'); // Exclude password from the response
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getUser };
