module.exports = async (req, res) => {
  try {
    // En la autentificacion se debe colocar en el middleware al usuario en req.user
    const newAdmi = await req.user.update(req.body);
    return res.status(200).send(newAdmi);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
