const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { protect } = require('../middlewares/authMiddleware');
const { upload } = require('../utils/fileUpload');

// Public route for QR code redirection
router.get('/:id', getEmployeeById);

// Protected routes (admin only)
router.get('/', protect, getEmployees);
router.post('/', protect, upload.single('profileImage'), createEmployee);
router.put('/:id', protect, upload.single('profileImage'), updateEmployee);
router.delete('/:id', protect, deleteEmployee);

module.exports = router;