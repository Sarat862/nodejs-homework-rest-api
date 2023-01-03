const fs = require('fs').promises;
const path = require('path');
const jimp = require('jimp');

const { User } = require('../../models/user');

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const { path: tmpUpload, originalname } = req.file;
    await (await jimp.read(tmpUpload)).resize(250, 250).writeAsync(tmpUpload);
    const { _id } = req.user;
    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("avatars", fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
}

module.exports = updateAvatar;