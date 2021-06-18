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
  subject: "Comika Media Info",
  html: "<h2>Hai</h2>",
};

const createTemplate = (content) => {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>COMIKA MEDIA INFO</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style type="text/css">
    body {
        margin: 0;
        padding: 0;
    }
    #header,
    #footer {
        height: 100px;
        background-color: #006bc1;
        text-align: center;
        color: white;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    #header>h1 {
        padding-top: 30px;
    }
    #footer {
        background-color: #0265b6;
        height: 50px;
    }
    #footer h4 {
        padding-top: 15px;
    }
    </style>
</head>

<body style="margin: 0; padding: 0;">
    <div id="header">
        <h1>Comika Media</h1>
    </div>
    <div style="margin: 30px 50px; font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;">
    ${content}
    </div>
    <div id="footer">
        <h4>
            All right reserved.
        </h4>
    </div>
</body>
</html>
`;
};

const send = ({ from, to, subject, html }) => {
  if (from) mailOptions.from = from;
  if (to) mailOptions.to = to;
  if (subject) mailOptions.subject = subject;
  if (html) mailOptions.html = createTemplate(html);
  try {
    // transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
module.exports = send;
