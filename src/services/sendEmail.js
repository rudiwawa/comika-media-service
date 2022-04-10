const nodemailer = require("nodemailer");
const { SendEmail } = require("../models");
const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.KEY_EMAIL;

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

sendSmtpEmail.sender = { name: "Comika Media", email: "redaksi@comika.media" };

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
  const payloadEmail = {
    email: to,
    subject: subject ? "COMIKA INFO : " + subject : "COMIKA INFO",
    body: createTemplate(body),
    success: true,
  };
  try {
    if (!to) throw new Error("Email is required to send email. Please check your email");
    if (!body) throw new Error("Body is required to send email. Please check your body");

    sendSmtpEmail.to = [{ email: payloadEmail.email }];
    sendSmtpEmail.subject = payloadEmail.subject;
    sendSmtpEmail.htmlContent = payloadEmail.body;

    const sendEmail = await apiInstance.sendTransacEmail(sendSmtpEmail);
    await SendEmail.create(payloadEmail);
    return sendEmail;
  } catch (error) {
    payloadEmail.success = false;
    payloadEmail.msg = error.message;
    SendEmail.create(payloadEmail);
    throw new Error(`${error.message}`);
  }
};
module.exports = send;
