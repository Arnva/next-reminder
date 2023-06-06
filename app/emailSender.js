"use strict";
import { createTransport } from "nodemailer";

async function emailSender(email,todos) {

  let transporter = createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'placeholder',
        pass: 'placeholder',}
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"arnav Shah" <arnavshah116@outlook.com>',
    to: email, 
    subject: 'Hello ✔',
    text: JSON.stringify(todos),
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);
}

export default emailSender;