const jwt = require('jsonwebtoken');


const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_CLIENT_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_CLIENT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

module.exports = { generateTokens };
