const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const mailOptions = {
  from: "[no-reply] Register-user <ghanyersa24@gmail.com>",
  to: "ghanyersa24@gmail.com",
  subject: "Sending Email using Nodejs",
  html: "<h1>HELLO WORLD</h1>",
};

const send = async ({ from, to, subject, html }) => {
  if (from) mailOptions.from = from;
  if (to) mailOptions.to = to;
  if (subject) mailOptions.subject = subject;
  if (html) mailOptions.html = html;
  const mail = await transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log("Email sent: " + info.response);
  });
};
module.exports = send;
