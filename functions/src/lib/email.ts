const nodemailer = require("nodemailer");
import { MailParams } from "../../../types/email";

const EMAIL_SUBJECT =
  process.env.EMAIL_SUBJECT ||
  process.env.MP_ORDER_NAME ||
  "Compra de La Crypta";
const EMAIL_TEXT = process.env.EMAIL_TEXT || EMAIL_SUBJECT;

export const sendEmail = async ({ fullname, email, url }: MailParams) => {
  console.info("Sending email...");
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    // secure: true,
    auth: {
      user: process.env.SMTP_USERNAME || "",
      pass: process.env.SMTP_PASSWORD || "",
    },
  });

  // send mail with defined transport object
  return transporter.sendMail({
    from: '"La Crypta" <eventos@lacrypta.com.ar>',
    to: email,
    subject: EMAIL_SUBJECT,
    text: EMAIL_TEXT,
    html: generateMailHTML({
      fullname,
      email,
      url,
    }),
  });
};

const generateMailHTML = ({ fullname, email, url }: MailParams) => {
  // import html file with fs
  const fs = require("fs");
  const emailTemplate = fs.readFileSync(
    "../email_templates/ticket.html",
    "utf8"
  );
  let html = emailTemplate;
  html = html.replace(/%FULLNAME%/g, fullname);
  html = html.replace(/%EMAIL%/g, email);
  html = html.replace(/%URL%/g, url);

  return html;
};
