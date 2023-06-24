"use strict";
import { createTransport } from "nodemailer";

async function emailSender(email,todos) {
  console.log(`heelo ${email} , ${todos}`)
  // await delay(1000);
  // console.log("working till emailsender");

  // let transporter = createTransport({
  //   host: 'smtp-mail.outlook.com',
  //   port: 587,
  //   secure: false,
  //   auth: {
  //       user: '',
  //       pass: '',}
  // });

  // // send mail with defined transport object
  // let info = await transporter.sendMail({
  //   from: '"arnav Shah" <arnavshah116@outlook.com>',
  //   to: decodeURIComponent(email), 
  //   subject: 'Reminders Today',
  //   text: todos,
  //   html: `<b> ${todos} </b>`,
  // });

  // console.log("Message sent: %s", info.messageId);
}

export default emailSender;