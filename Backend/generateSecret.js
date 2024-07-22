const crypto = require('crypto');

const generateSecret = () => {
  return crypto.randomBytes(32).toString('base64');
};

console.log('JWT_SECRET:', generateSecret());
console.log('JWT_REFRESH_SECRET:', generateSecret());
