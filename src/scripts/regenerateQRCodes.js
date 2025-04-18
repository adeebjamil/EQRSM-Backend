const mongoose = require('mongoose');
require('dotenv').config();
const Employee = require('../models/Employee');
const QRCode = require('qrcode');

async function regenerateAllQRCodes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🚀 MongoDB Connected Successfully');
    
    // Get all employees
    const employees = await Employee.find({});
    console.log(`Found ${employees.length} employees`);
    
    if (employees.length === 0) {
      console.log('No employees found in the database!');
      process.exit(0);
    }
    
    // Log all employee IDs before updating
    console.log('Employee IDs found:', employees.map(e => e.employeeId));
    
    // Update each employee's QR code
    for (const employee of employees) {
      // Hardcode the Vercel URL to ensure it's correct
      const url = `https://eqsrm-frontend-oqp1-git-main-adeebs-projects-3dd01d17.vercel.app/employee/${employee.employeeId}`;
      console.log(`Generating QR for ${employee.name} (${employee.employeeId}) with URL: ${url}`);
      
      const qrCodeDataURL = await QRCode.toDataURL(url);
      employee.qrCode = qrCodeDataURL;
      await employee.save();
      console.log(`✅ Updated QR code for employee ${employee.name} (${employee.employeeId})`);
    }
    
    console.log('All QR codes have been regenerated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error regenerating QR codes:', error);
    process.exit(1);
  }
}

regenerateAllQRCodes();