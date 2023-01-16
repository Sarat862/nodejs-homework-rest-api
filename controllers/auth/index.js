const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscriptionUser = require('./updateSubscriptionUser');
const updateAvatar = require('./updateAvatar');
const verify = require('./verify');
const resendVerifyEmail = require('./resendVerifyEmail');

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateSubscriptionUser,
    updateAvatar,
    verify,
    resendVerifyEmail
}