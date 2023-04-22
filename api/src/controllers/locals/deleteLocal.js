module.exports = async (req, res) => {
  try {
    const { local, userId, role } = req;
    if (userId !== req.local.UserId || role !== 'admin' || role !== 'superAdmin') throw new Error('Only an admin or the owner of the locale can delete a locale');
    await local.destroy();
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
