const cloudinary = require('cloudinary').v2;
// const { Document } = require('../../db');

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// const deliveryRules = [
//   {
//     secure: true,
//     allowed_for_external: false,
//     access_mode: 'authenticated',
//     if: "resource_type = 'raw' AND format = 'pdf'",
//     sign_url: true,
//   },
// ];

// cloudinary.api.update_delivery_rules(deliveryRules, { resource_type: 'raw' }, (error, result) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(result);
//   }
// });

module.exports = cloudinary;
