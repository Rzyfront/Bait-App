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
    html: `<!DOCTYPE html><html><head><meta charset="UTF-8" /><title>¡Activa tu cuenta de Bait!</title><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head><body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333333; background-color: #f0f0f0; margin: 0; padding: 0;"><table style="max-width: 600px; margin: 0 auto; padding: 5%; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 4px; text-align: center;"><tr><td><h1 style="font-size: 24px; font-weight: bold; color: #333333;">Hola ${userName}</h1><p style="margin-bottom: 20px;">Gracias por registrarte en Bait. Haga clic en este botón para verificar su correo electrónico:</p><a href="${process.env.SERVER_DEPLOY}/user/verified?token=${tokenEmail}" style="display: inline-block; padding: .7rem 1.5rem; background-color: #007bff; color: #f0f0f0; border-radius: .5rem; border:0; font-weight: 600; text-decoration: none;">Verifica tu email</a><p style="margin-top: 20px; margin-bottom: 20px;">Este enlace caducará en 24 horas. Si no se ha registrado para obtener una cuenta de Bait, puede ignorar este correo.</p><p style="margin-bottom: 10px;">¡Gracias por leer!</p><p style="margin-bottom: 0;">Saludos cordiales,</p><p style="margin-bottom: 0;">Bait</p></td></tr></table></body></html>`,
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
