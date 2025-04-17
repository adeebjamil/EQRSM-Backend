const Employee = require('../models/Employee');
const { generateQR } = require('../utils/qrGenerator');
const { convertToBase64 } = require('../utils/fileUpload');

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new employee with image upload
const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    
    // Handle file upload if present
    if (req.file) {
      employeeData.profileImage = convertToBase64(
        req.file.buffer,
        req.file.mimetype
      );
    }
    
    // Ensure profileImage is a string, not an empty object
    if (employeeData.profileImage && typeof employeeData.profileImage === 'object' && 
        Object.keys(employeeData.profileImage).length === 0) {
      employeeData.profileImage = '';
    }
    
    const newEmployee = new Employee(employeeData);
    
    // Generate QR code for the new employee
    const qrCode = await generateQR(employeeData.employeeId);
    newEmployee.qrCode = qrCode;
    
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update employee with new image
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    const updateData = req.body;
    
    // Handle file upload if present
    if (req.file) {
      updateData.profileImage = convertToBase64(
        req.file.buffer,
        req.file.mimetype
      );
    }
    
    // Ensure profileImage is a string, not an empty object
    if (updateData.profileImage && typeof updateData.profileImage === 'object' && 
        Object.keys(updateData.profileImage).length === 0) {
      updateData.profileImage = '';
    }
    
    // Update employee fields
    Object.assign(employee, updateData);
    
    // Regenerate QR if employeeId changed
    if (updateData.employeeId && updateData.employeeId !== req.params.id) {
      employee.qrCode = await generateQR(updateData.employeeId);
    }
    
    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ employeeId: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};