import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  // service: 'gmail',
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465',
  // secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

});

export const sendResetPasswordEmail = async (email, token) => {
  const resetURL = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${token}`;

  const message = {
    from: `"EventEase Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request',
    text: 'Hey there',
    html: `
      <h1>You have requested a password reset</h1>
      <p>Please click on the following link to reset your password:</p>
      <a href="${resetURL}" clicktracking=off>${resetURL}</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      <p>This link will expire in 10 minutes.</p>
    `
  };
  console.log(`<h1>You have requested a password reset</h1>
      <p>Please click on the following link to reset your password:</p>
      <a href="${resetURL}" clicktracking=off>${resetURL}</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      <p>This link will expire in 10 minutes.</p>`);
  console.log('Preparing to send email to:', email);
  console.log('Using transporter:', process.env.EMAIL_USER, process.env.EMAIL_HOST, process.env.EMAIL_PORT);

  // await transporter.sendMail(message);
  transporter.sendMail(message, (error, info) => {
    if (error) {
        console.error("ERROR shown", error);
    } else {
        console.error("Email sent sucessfully");
        console.log("Accepted", info.accepted);
        console.log("Rejected", info.rejected);
        console.log("response", info.response);
    }
});
};