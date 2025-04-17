const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure storage
const storage = multer.memoryStorage(); // Store files in memory

// Configure file filter
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// Initialize upload
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Convert file buffer to base64
const convertToBase64 = (buffer, mimetype) => {
  return `data:${mimetype};base64,${buffer.toString('base64')}`;
};

module.exports = {
  upload,
  convertToBase64
};