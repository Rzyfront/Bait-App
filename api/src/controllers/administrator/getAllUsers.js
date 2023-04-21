const { User, Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { numPage } = req.params;
    const { where } = req;
    const page = numPage || 1;
    const { count, rows } = await User.findAndCountAll({
      where: where.user ?? {},
      attributes: ['id', 'name', 'lastname', 'age', 'role', 'location', 'phone_number', 'email'],
      include: [
        { model: Image, attributes: ['url'] },
      ],
      limit: page * 10,
      offset: (page - 1) * 10,
    });
    const totalPages = Math.ceil(count / 10);
    if (!rows.length) throw new Error('Users not found');
    return res.status(200).json({
      success: true, count, totalPages, users: rows,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};
