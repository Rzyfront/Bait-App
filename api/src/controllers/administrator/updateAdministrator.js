module.exports = async (req, res) => {
  try {
    // En la autentificacion se debe colocar en el middleware al usuario en req.user
    const updateAdmi = await req.user.update(req.body);
    return res.status(201).json({ success: true, updateAdmi });
  } catch (err) {
    return res.status(400).json({ message: err.message, success: false });
  }
};
