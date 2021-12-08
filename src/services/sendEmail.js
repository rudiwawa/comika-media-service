const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { SendEmail } = require("../models");

const mailOptions = {
  from: "[no-reply] Redaksi Comika Media <redaksi@comika.media>",
  to: "ghanyersa24@gmail.com",
  subject: "COMIKA INFO",
  html: "",
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
  #footer,
  .card {
      height: 100px;
      background-color: #006bc1;
      text-align: center;
      color: white;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  #header>h1 {
      padding-top: 30px;
  }

  .btn {
      background-color: #0265b6;
      height: 50px;
      padding: 10px 20px;
      color: white;
      border-radius: 4px;
      box-shadow: 0px 0px 5px #0265b6;
  }

  .text-decoration-none {
      text-decoration: none;
  }

  .w-100 {
      width: 100% !important;
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

const send = async ({ to, subject, body }) => {
  if (to) mailOptions.to = to;
  if (subject) mailOptions.subject = "COMIKA INFO : " + subject;
  if (body) mailOptions.html = createTemplate(body);

  const recordSendEmail = {
    email: mailOptions.to,
    subject: mailOptions.subject,
    body,
    success: true,
    msg: "",
  };

  try {
    const oauthEmail = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URL
    );
    oauthEmail.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    const accessToken = await oauthEmail.getAccessToken();
    const payloadTransporter = {
      sevice: "gmail",
      auth: {
        type: "OAuth2",
        email: "ghanyersa24@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken:
          "1//04rKurgbP8OEOCgYIARAAGAQSNwF-L9Ir2OSKN7UbdM0myQyDN81xUsK4zGOGeDoh8jka1qySHvNS6qpWSfCDmwGuZXu4Mgzg4wM",
        accessToken,
      },
    };

    const transporter = nodemailer.createTransport(payloadTransporter);
    const sendEmail = await transporter.sendMail(mailOptions);
    console.log(sendEmail);
    return sendEmail;
  } catch (error) {
    // recordSendEmail.success = false;
    // recordSendEmail.msg = error.message;
    // SendEmail.create(recordSendEmail);
    throw new Error(`${error.message}`);
  }
};
module.exports = send;
