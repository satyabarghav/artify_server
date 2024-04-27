const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email through Gmail:", error.message);
      } else {
        console.log("Email Sent Successfully");
      }
    });
  } catch (error) {
    console.error("Error sending email through Gmail:", error.message);
  }
};

module.exports = sendEmail;
