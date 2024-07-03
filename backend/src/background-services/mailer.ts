import { createTransporter } from "../config/mailConfig";
import ejs from "ejs";

export const sendWelcomeEmail = (email: string, name: string) => {
  const transporter = createTransporter();

  ejs.renderFile(
    __dirname + "/../../src/views/welcomeNewUsers.ejs",
    { name: name },
    async (err, template) => {
      if (err) {
        console.log("Error sending mail: ", err);
        return;
      }
      const mailOptions = {
        from: process.env.USER,
        to: email,
        subject: "Welcome to Shoppie",
        html: template,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent");
      } catch (error) {
        console.log("Error sending email");
      }
    }
  );
};
