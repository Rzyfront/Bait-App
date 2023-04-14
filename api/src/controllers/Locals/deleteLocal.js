module.exports = async (req, res) => {
  try {
    await req.local.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
