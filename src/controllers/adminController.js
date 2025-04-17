const jwt = require('jsonwebtoken');

const adminLogin = (req, res) => {
  const { username, password } = req.body;
  
  // Hardcoded admin credentials as specified
  if (username === 'adeeb' && password === '123') {
    // Generate JWT token
    const token = jwt.sign(
      { id: 'admin', username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.json({
      id: 'admin',
      username,
      token
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { adminLogin };