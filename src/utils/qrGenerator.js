const QRCode = require('qrcode');

const generateQR = async (employeeId) => {
  try {
    // Base URL for redirection when QR is scanned
    const url = `${process.env.FRONTEND_URL}/employee/${employeeId}`;
    
    // Generate QR code as data URL
    const qrCodeDataURL = await QRCode.toDataURL(url);
    return qrCodeDataURL;
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw new Error('Failed to generate QR code');
  }
};

module.exports = { generateQR };