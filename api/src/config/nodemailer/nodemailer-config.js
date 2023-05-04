const nodemailer = require('nodemailer') // eslint-disable-line
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

const sendVerificationEmail = async (id, userEmail, userName) => {
  const tokenEmail = jwt.sign(
    { id, verified: 'verified' },
    process.env.SECRET_KEY_2,
  );
  await transporter.sendMail({
    subject: 'Verifica tu Email de Bait!!',
    from: email,
    to: userEmail,
    html: `<!DOCTYPE html><html><head><meta charset="UTF-8" /><title>¡Activa tu cuenta de Bait!</title><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head><body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333333; background-color: #f0f0f0; margin: 0; padding: 0;"><table style="max-width: 600px; margin: 0 auto; padding: 5%; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 4px; text-align: center;"><tr><td><h1 style="font-size: 24px; font-weight: bold; color: #333333;">Hola ${userName}</h1><p style="margin-bottom: 20px;">Gracias por registrarte en Bait. Haga clic en este botón para verificar su correo electrónico:</p><a href="${process.env.SERVER_DEPLOY}/user/verified?token=${tokenEmail}" style="display: inline-block; padding: .7rem 1.5rem; background-color: #007bff; color: #f0f0f0; border-radius: .5rem; border:0; font-weight: 600; text-decoration: none;">Verifica tu email</a><p style="margin-top: 20px; margin-bottom: 20px;">Este enlace caducará en 24 horas. Si no se ha registrado para obtener una cuenta de Bait, puede ignorar este correo.</p><p style="margin-bottom: 10px;">¡Gracias por leer!</p><p style="margin-bottom: 0;">Saludos cordiales,</p><p style="margin-bottom: 0;">Bait</p></td></tr></table></body></html>`,
  });
};

const sendReviewRejected = async (
  userEmail,
  userName,
  title,
  comment,
  reason = 'contenido inapropiado',
) => {
  await transporter.sendMail({
    subject: 'Review rechazada',
    from: email,
    to: userEmail,
    html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Notificación de eliminación de reseña</title><style>body{font-family: Arial, sans-serif;font-size: 16px;line-height: 1.5;color: #333;}p{margin: 0 0 1.5rem;}h1{font-size: 24px;margin: 0 0 1.5rem;}.container{max-width: 600px;margin: 0 auto;padding: 1.5rem;background-color: #f9f9f9;border: 1px solid #ddd;}.review{text-align: center;background-color: rgb(200, 217, 255);padding: .5rem 1rem;margin-bottom: 1rem;border-radius: 1rem;}.review h4{margin: .5rem;}</style></head><body><div class="container"><h1>Notificación de eliminación de reseña</h1><h3>Estimado/a ${userName},</h3><h4>Le informamos que su reseña: </h4><div class="review"><h4>${title}</h4><p>${comment}</p></div><p>Ha sido eliminada de nuestro sitio web debido a ${reason}.</p><p>Entendemos que este contenido puede ser importante para usted, pero nuestra política de revisión de contenido establece que no se permiten comentarios inapropiados o ofensivos. Por favor, asegúrese de seguir nuestras pautas de revisión de contenido en el futuro para evitar que sus reseñas sean eliminadas.</p><p>Gracias por su comprensión.</p><p>Atentamente,</p><p>Administración de Bait</p></div></body></html>`,
  });
};
const sendRequestOdAcquisitionLocal = async ({
  userEmail,
  userName,
  localId,
  localName,
}) => {
  await transporter.sendMail({
    subject: 'Solcitud de adquisición de local',
    from: email,
    to: email,
    html: `
    <h1>El usuario:</h1>
    <p>Nombre:${userName}</p>
    <p>Email:${userEmail}</p>
    <h1>Quiere reclamar el local:</h1>
    <p>Nombre:${localName}</p>
    <p>Id:${localId}</p>
`,
  });
};
const sendRequestForOwnership = async ({ userEmail, userName, userId }) => {
  await transporter.sendMail({
    subject: 'Solcitud de adquisición de local',
    from: email,
    to: email,
    html: `
    <h1>El usuario:</h1>
    <p>Id:${userId}</p>
    <p>Nombre:${userName}</p>
    <p>Email:${userEmail}</p>
    <h1>Quiere que se le asigne el rol de owner c:</h1>
`,
  });
};

const sendNotificationThatReviewWasVerified = async ({ userEmail, userName, reviewTitle }) => {
  await transporter.sendMail({
    subject: 'Review verficada',
    from: email,
    to: userEmail,
    html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Reseña verificada</title></head><body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333; height: 100vh; display: grid; place-content: center;"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #f9f9f9; border: 1px solid #ddd; text-align: center;"><tr><td style="padding: 1.5rem;"><h1 style="font-size: 24px; margin: 0 0 1.5rem;">¡Hola ${userName}, hemos verificado tu reseña con el titulo de ${reviewTitle}</h1><p style="margin: 0 0 1.5rem;">Y esta ha sido publicada para que todos vean tu opinión, ¡Gracias y seguí Disfrutando Bait!</p><a href="${process.env.FRONT_DEPLOY}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 1rem 2rem; text-decoration: none; border-radius: 5px; margin-top: 1.5rem;">Ir a la página principal</a></td></tr></table></td></tr></table></body></html>`,
  });
};

const sendSuccessRegisterWithGoogle = async ({ userEmail, userName }) => {
  await transporter.sendMail({
    subject: 'Bienvenido a Bait',
    from: email,
    to: userEmail,
    html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Confirmación de inicio de sesión con Google</title></head><body bgcolor="#f9f9f9" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333;"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center"><table width="600" border="0" cellspacing="0" cellpadding="0"><tr><td style="padding: 1.5rem; border: 1px solid #ddd; text-align: center;"><h1 style="font-size: 24px; margin: 0 0 1.5rem;">¡Hola ${userName}, Gracias por registrarte en nuestra App</h1><p style="margin: 0 0 1.5rem;">Al hacerlo con Google, se verifica automáticamente, ya puedes ingresar y comenzar a disfrutar de lo que tenemos para ti en nuestra App, ¡Disfrutá Bait!</p><a href="${process.env.FRONT_DEPLOY}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 1rem 2rem; text-decoration: none; border-radius: 5px; margin-top: 1.5rem;">Ir a la página principal</a><p style="margin-bottom: 10px;">¡Gracias por leer!</p><p style="margin-bottom: 0;">Saludos cordiales,</p><p style="margin-bottom: 0;">Bait</p></td></tr></table></td></tr></table></body></html>`,
  });
};

const sendNotificationThatLocalWasVerified = async ({ userName, localName, userEmail }) => {
  await transporter.sendMail({
    subject: 'Local verificado',
    from: email,
    to: userEmail,
    html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Te hemos asignado un Local</title></head><body style="margin: 0; padding: 0; font-family: Arial, sans-serif;"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;"><tr><td align="center" bgcolor="#f9f9f9" style="border: 1px solid #ddd; padding: 20px;"><h1 style="font-size: 24px; margin: 0 0 20px;">¡Hola ${userName}, tu reclamo del ${localName}, ha sido verificado</h1><p style="margin: 0 0 20px;">Ahora puedes cargar tu menu en el Local y mostrarle a todos los productos, horarios y tipos de modida que ofreces ¡Gracias por confiar en nuestro trabajo!</p><a href="${process.env.FRONT_DEPLOY}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Ir a la página principal</a><p style="margin: 0; font-size: 12px;">Bait</p></td></tr></table></body></html>`,
  });
};

const sendNotiOfLocalCreatedComplete = async ({ userName, userEmail }) => {
  await transporter.sendMail({
    subject: 'Local creado con éxito',
    from: email,
    to: userEmail,
    html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Confirmación de Creacion de Local como propietario</title></head><body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333; height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #f9f9f9;"><table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #f9f9f9; border: 1px solid #ddd; text-align: center;"><tr><td style="padding: 1.5rem;"><h1 style="font-size: 24px; margin: 0 0 1.5rem;">¡Hola ${userName}, Gracias por crear un Local en nuestra App, es muy importante para nosotros tu opinión!</h1><p style="margin: 0 0 1.5rem;">Tu local será verificado de acuerdo a la documentacion adjunta y recibiras un correo indicándote cuando esto pase, para que puedas ingresar el menú y detalles de tu Local.</p><a href="${process.env.FRONT_DEPLOY}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 1rem 2rem; text-decoration: none; border-radius: 5px; margin-top: 1.5rem;">Ir a la página principal</a></td></tr></table></body></html>`,
  });
};
const sendNotiOfLocalCreatedSmall = async ({ userName, userEmail }) => {
  await transporter.sendMail({
    subject: 'Local creado con éxito',
    from: email,
    to: userEmail,
    html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Confirmación de Creacion de Local como propietario</title></head><body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333; height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #f9f9f9;"><table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #f9f9f9; border: 1px solid #ddd; text-align: center;"><tr><td style="padding: 1.5rem;"><h1 style="font-size: 24px; margin: 0 0 1.5rem;">¡Hola ${userName}, Gracias por crear un Local en nuestra App!</h1><p style="margin: 0 0 1.5rem;">¡Ya puedes crear tu reseña del local, es muy importante para nosotros conocer tu opinión!</p><a href="${process.env.FRONT_DEPLOY}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 1rem 2rem; text-decoration: none; border-radius: 5px; margin-top: 1.5rem;">Ir a la página principal</a></td></tr></table></body></html>`,

  });
};

module.exports = {
  sendVerificationEmail,
  sendReviewRejected,
  sendRequestOdAcquisitionLocal,
  sendRequestForOwnership,
  sendNotificationThatReviewWasVerified,
  sendSuccessRegisterWithGoogle,
  sendNotificationThatLocalWasVerified,
  sendNotiOfLocalCreatedComplete,
  sendNotiOfLocalCreatedSmall,
};
