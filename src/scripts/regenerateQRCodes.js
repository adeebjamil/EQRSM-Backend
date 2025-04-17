const mongoose = require('mongoose');
require('dotenv').config();
const Employee = require('../models/Employee');
const QRCode = require('qrcode');

// Directly generate QR with Vercel URL instead of using the utility function
async function generateQRWithVercelURL(employeeId) {
  try {
    // Hardcode the Vercel URL here to ensure it's correct
    const url = `https://eqsrm-frontend-oqp1.vercel.app/employee/${employeeId}`;
    
    // Generate QR code as data URL
    const qrCodeDataURL = await QRCode.toDataURL(url);
    return qrCodeDataURL;
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw new Error('Failed to generate QR code');
  }
}

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
      // Use the hardcoded URL generator instead
      const newQRCode = await generateQRWithVercelURL(employee.employeeId);
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