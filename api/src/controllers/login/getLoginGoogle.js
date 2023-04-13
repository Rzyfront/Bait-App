const admin = require('../../config/firebase/firebase-config');

module.exports = async (req, res) => {
  const token = req.get('authorization');
  const decodedToken = admin.auth().verifyIdToken(token);
  console.log(decodedToken);
  res.json({ success: true });
};
