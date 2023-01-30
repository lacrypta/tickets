const nodemailer = require("nodemailer");
import { MailParams } from "../../../types/email";

const EMAIL_SUBJECT =
  process.env.EMAIL_SUBJECT ||
  process.env.MP_ORDER_NAME ||
  "Compra de La Crypta";
const EMAIL_TEXT = process.env.EMAIL_TEXT || EMAIL_SUBJECT;

export const sendEmail = async ({ fullname, email, url }: MailParams) => {
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
  let html = "";
  html += '<div style="padding: 1em; background: white;">';
  html +=
    '  <div style="border: 1em solid black; padding: 1.5em; margin-top: 0.3em; color: black;">';
  html += '    <div style="text-align: right; margin: 0;">';
  html +=
    '        <img width="100" src="https://raw.githubusercontent.com/lacrypta/branding/main/black-skin/256.png" />';
  html += "    </div>";
  html += '    <div style="margin-top: 0.5em; font-size: 1.3em;">';
  html += "      <div>" + EMAIL_SUBJECT + "</div>";
  html +=
    '      <div>Dirección: <a href="https://www.google.com/maps/place/Villanueva+1367,+C1426+BMI,+Buenos+Aires/@-34.5648535,-58.4453019,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb5c8870cdc23:0xc945d369aa39b3e0!8m2!3d-34.5648579!4d-58.4431132">Villanueva 1367, CABA</a></div>';
  html += "      <div>Hacé click en el siguiente Link para verla</div>";
  html += '      <div><a href="%URL%">%URL%</a></div>';
  html += "    </h1>";
  html += "    ";
  html +=
    '    <div style="text-align: left; font-size: 0.8em; margin-top: 2.5em; padding-top: 0.7em; border-top: 1px solid black;line-height: 1.5em;">';
  html += "      <div>";
  html += "        <span>La Crypta</span>";
  html += "      </div>";
  html += "      <div>";
  html +=
    '        <span><img width="16" src="https://raw.githubusercontent.com/lacrypta/branding/main/mails/black/envelope.png" /></span>';
  html += "        <span>info@lacrypta.com.ar</span>";
  html += "      </div>";
  html += "      <div>";
  html +=
    '        <span><img width="16" src="https://raw.githubusercontent.com/lacrypta/branding/main/mails/black/phone.png" /></span>';
  html += "        <span>11 3108-0456</span>";
  html += "      </div>";
  html += "    </div>";
  html += '    <div style="text-align: center; margin-top: 1em;">';
  html +=
    '      <img height="15" src="https://raw.githubusercontent.com/lacrypta/branding/main/title/512.png" />';
  html += "    </div>";
  html += "  </div>";
  html += "";
  html += "</div>";

  html = html.replace(/%FULLNAME%/g, fullname);
  html = html.replace(/%EMAIL%/g, email);
  html = html.replace(/%URL%/g, url);

  return html;
};
