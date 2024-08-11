const crypto = require('crypto');

const generateSecret = () => {
  return crypto.randomBytes(32).toString('base64');
};

console.log('JWT_CLIENT_SECRET:', generateSecret());
console.log('JWT_CLIENT_REFRESH_SECRET:', generateSecret());
