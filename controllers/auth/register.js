const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
require('dotenv').config();

const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');
const sendEmailNodemailer = require('../../services/email/sendEmailNodemailer');

const { BASE_URL } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

    const verifyEmail = {
        to: email,
        subject: "Verify your email",
        html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click verify email</a>`
    }

    await sendEmailNodemailer(verifyEmail);
    
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
    })
}

module.exports = register;