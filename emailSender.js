"use strict";
const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    service: "gmail",
    auth: {
        user: 'furqana405@gmail.com',
        pass: 'jaowfuycbqvvyvwa',
    },
    secure: true, // Use SSL/TLS
    port: 587,

  });
  
//   console.log("Message sent: %s", info.messageId);
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   eykoknwqehabnayt

module.exports = transporter;
