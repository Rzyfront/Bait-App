const nodemailer = require('nodemailer');// eslint-disable-line
const jwt = require('jsonwebtoken');

const pass = process.env.EMAIL_PASS;
const email = process.env.EMAIL_BAIT;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass,
  },
});

const sendVerificationEmail = (id, userEmail) => {
  const tokenEmail = jwt.sign({ id, verified: 'verified' }, process.env.SECRET_KEY_2);
  transporter.sendMail({
    subject: 'Verifica tu Email de Bait!!',
    from: process.env.EMAIL_BAIT,
    to: userEmail,
    html: `<h1>Email recibed</h1>
      <a href="http://localhost:3001/users/verified?token=${tokenEmail}&verified=true">verifica tu email</a>`,
  });
};

module.exports = { sendVerificationEmail };
