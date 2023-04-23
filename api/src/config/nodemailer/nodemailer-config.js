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

const sendVerificationEmail = (id, userEmail, userName) => {
  const tokenEmail = jwt.sign({ id, verified: 'verified' }, process.env.SECRET_KEY_2);
  transporter.sendMail({
    subject: 'Verifica tu Email de Bait!!',
    from: email,
    to: userEmail,
    html: `<!DOCTYPE html><html><head><meta charset="UTF-8" /><title>¡Activa tu cuenta de Bait!</title><meta name="viewport" content="width=device-width, initial-scale=1.0" /><style>body {font-family: Arial, sans-serif;font-size: 16px;line-height: 1.5;color: #333333;background-color: #f0f0f0;margin: 0;padding: 0;}.container {max-width: 600px;margin: 0 auto;padding: 5%;background-color: #ffffff;border: 1px solid #dddddd;border-radius: 4px;display: flex;text-align: start;align-content: center;justify-content: center;flex-direction: column;}h1 {margin-top: 0;font-size: 24px;font-weight: bold;color: #333333;text-align: center;}p {margin-bottom: 20px;}a {color: #007bff;text-decoration: underline;align-self: center;}.verify{padding: .7rem 1.5rem;background-color: #007bff;color: #f0f0f0;border-radius: .5rem;border:0;font-weight: 600;}@media only screen and (max-width: 600px) {body {font-size: 14px;}.container {width: 90%;margin: 0;border: none;border-radius: 0;}}</style></head><body><div class="container"><h1>Hola ${userName}</h1><p>Gracias por registrarse en Bait. Haga clic en este botón para verificar su correo electrónico:</p><a href="${process.env.SERVER_DEPLOY}/user/verified?token=${tokenEmail}"><button class="verify">Verifica tu email</button></a><p>Este enlace caducará en 24 horas. Si no se ha registrado para obtener una cuenta de Bait, puede ignorar este correo.</p><p>¡Gracias por leer!</p><p>Saludos cordiales,</p><p>Bait</p></div></body></html>`,
  });
};

const sendReviewRejected = (userEmail, userName, title, comment, reason = 'contenido inapropiado') => {
  transporter.sendMail({
    subject: 'Review rechazada',
    from: email,
    to: userEmail,
    html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Notificación de eliminación de reseña</title><style>body{font-family: Arial, sans-serif;font-size: 16px;line-height: 1.5;color: #333;}p{margin: 0 0 1.5rem;}h1{font-size: 24px;margin: 0 0 1.5rem;}.container{max-width: 600px;margin: 0 auto;padding: 1.5rem;background-color: #f9f9f9;border: 1px solid #ddd;}.review{text-align: center;background-color: rgb(200, 217, 255);padding: .5rem 1rem;margin-bottom: 1rem;border-radius: 1rem;}.review h4{margin: .5rem;}</style></head><body><div class="container"><h1>Notificación de eliminación de reseña</h1><h3>Estimado/a ${userName},</h3><h4>Le informamos que su reseña: </h4><div class="review"><h4>${title}</h4><p>${comment}</p></div><p>Ha sido eliminada de nuestro sitio web debido a ${reason}.</p><p>Entendemos que este contenido puede ser importante para usted, pero nuestra política de revisión de contenido establece que no se permiten comentarios inapropiados o ofensivos. Por favor, asegúrese de seguir nuestras pautas de revisión de contenido en el futuro para evitar que sus reseñas sean eliminadas.</p><p>Gracias por su comprensión.</p><p>Atentamente,</p><p>Administración de Bait</p></div></body></html>`,
  });
};

module.exports = { sendVerificationEmail, sendReviewRejected };
