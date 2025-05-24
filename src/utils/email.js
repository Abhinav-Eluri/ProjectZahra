const nodemailer = require('nodemailer');

// Create a transporter object
// Verify email configuration
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

// Check if email credentials are properly configured
if (!emailUser || !emailPass || emailUser === 'your-email@gmail.com' || emailPass === 'your-app-password') {
  console.warn('Email credentials not properly configured. Please update .env.local with valid Gmail credentials and App Password.');
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

/**
 * Send an order confirmation email to the user
 * @param {string} userEmail - The email address of the user
 * @param {object} order - The order object containing order details
 * @param {array} orderItems - The items in the order
 * @returns {Promise} - A promise that resolves when the email is sent
 */
async function sendOrderConfirmationEmail(userEmail, order, orderItems) {
  try {
    // Create HTML content for the email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h1 style="color: #333; text-align: center;">Order Confirmation</h1>
        <p>Thank you for your order! We're processing it now.</p>

        <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          <h2 style="color: #333; margin-top: 0;">Order Details</h2>
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Total:</strong> €${order.total.toFixed(2)}</p>
        </div>

        <h3 style="color: #333;">Items</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Item</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Price</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Quantity</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${orderItems.map(item => `
              <tr>
                <td style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">€${item.price.toFixed(2)}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">€${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold;">€${order.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top: 30px; text-align: center; color: #777;">
          <p>If you have any questions, please contact our support team.</p>
          <p>Thank you for shopping with us!</p>
        </div>
      </div>
    `;

    // Send the email
    const info = await transporter.sendMail({
      from: `"Project Zahra" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Order Confirmation #${order.id}`,
      html: htmlContent,
    });

    console.log('Order confirmation email sent:', info.messageId);
    return info;
  } catch (error) {
    // Provide more specific error messages for common issues
    if (error.code === 'EAUTH') {
      console.error('Authentication failed: Please check your Gmail credentials and ensure you are using an App Password:', error.message);
    } else if (error.code === 'ESOCKET' || error.code === 'ECONNECTION') {
      console.error('Connection error: Unable to connect to the email server:', error.message);
    } else if (error.code === 'ETIMEDOUT') {
      console.error('Connection timed out: The email server is not responding:', error.message);
    } else {
      console.error('Error sending order confirmation email:', error);
    }

    // Add additional context to the error
    error.emailContext = 'Failed to send order confirmation email';
    throw error;
  }
}

module.exports = {
  sendOrderConfirmationEmail,
};
