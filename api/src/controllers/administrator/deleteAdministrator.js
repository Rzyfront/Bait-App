module.exports = async (req, res) => {
  try {
    // En la autentificacion se debe colocar en el middleware al usuario en req.user
    await req.user.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
