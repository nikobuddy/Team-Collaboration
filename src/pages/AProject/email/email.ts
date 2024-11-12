import nodemailer from 'nodemailer';

// Create a transporter using your email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // use your email service provider (e.g., Gmail, Outlook)
  auth: {
    user: process.env.EMAIL_USER, // Your email address (use environment variables for security)
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

// Email sending function
export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
