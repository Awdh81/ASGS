const nodemailer = require("nodemailer");

const sendResetMail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Reset Password",
    html: `
      <h2>Password Reset</h2>
      <p>Your reset token:</p>
      <h1>${token}</h1>
    `
  });
};

module.exports = sendResetMail;