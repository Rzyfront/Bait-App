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
    from: email,
    to: userEmail,
    html: `<h1>Verifica tu email</h1>
      <a href="http://localhost:3001/user/verified?token=${tokenEmail}">verifica tu email</a>`,
  });
};

const sendReviewRejected = (userEmail, comment) => {
  transporter.sendMail({
    subject: 'Review rechazada',
    from: email,
    to: userEmail,
    html: `<h1>Tu review:</h1>
      <p >${comment}</p>
      <h1>Fue rechazada</h1>
      `,
  });
};

module.exports = { sendVerificationEmail, sendReviewRejected };
