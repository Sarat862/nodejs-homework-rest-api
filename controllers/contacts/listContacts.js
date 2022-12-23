const {Contact} = require('../../models/contact');

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = { $in: [true, false]} } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, favorite }, "", { skip, limit }).populate("owner", "email");
  res.json(result);
}

module.exports = listContacts;