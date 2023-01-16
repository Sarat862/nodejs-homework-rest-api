const { User } = require('../../models/user');
const { HttpError, sendEmailNodemailer } = require('../../helpers');

require('dotenv').config();
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(400, "missing required field email");
    }

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }

    const verifyEmail = {
        to: email,
        subject: "Verify your email",
        html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click verify email</a>`
    }
    await sendEmailNodemailer(verifyEmail);

    res.json({
        message: "Verification email sent"
    })
}

module.exports = resendVerifyEmail;