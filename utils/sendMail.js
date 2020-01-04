const nodemailer = require("nodemailer");

module.exports = (mailOption, callback) => {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "mdzyaan@gmail.com",
      pass: 9003095202
    }
  });
  console.log("tran",transporter)
  transporter.sendMail(mailOption, callback)
}
