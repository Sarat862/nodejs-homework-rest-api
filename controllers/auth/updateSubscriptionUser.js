const { User } = require('../../models/user');
const {HttpError} = require('../../helpers');

const updateSubscriptionUser = async (req, res) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

    if (!result) { 
        throw HttpError(404, "not found");
    }

    res.json(result)
}

module.exports = updateSubscriptionUser;