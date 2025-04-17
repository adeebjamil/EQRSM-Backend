const mongoose = require('mongoose');
require('dotenv').config();
const Employee = require('../models/Employee');
const { generateQR } = require('../utils/qrGenerator');

async function regenerateAllQRCodes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🚀 MongoDB Connected Successfully');
    
    // Get all employees
    const employees = await Employee.find({});
    console.log(`Found ${employees.length} employees`);
    
    // Update each employee's QR code
    for (const employee of employees) {
      const newQRCode = await generateQR(employee.employeeId);
      employee.qrCode = newQRCode;
      await employee.save();
      console.log(`Updated QR code for employee ${employee.name} (${employee.employeeId})`);
    }
    
    console.log('All QR codes have been regenerated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error regenerating QR codes:', error);
    process.exit(1);
  }
}

regenerateAllQRCodes();