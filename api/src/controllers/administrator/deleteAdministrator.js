module.exports = async (req, res) => {
  try {
    // En la autentificacion se debe colocar en el middleware al usuario en req.user
    await req.user.destroy();
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
