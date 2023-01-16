const express = require('express');

const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate, upload } = require('../../middlewars');
const {schemas} = require('../../models/user')

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.post('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch('/:userId/subscription', authenticate, ctrlWrapper(ctrl.updateSubscriptionUser));

router.patch('/avatars', authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));

router.post('/verify', validateBody(schemas.emailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

module.exports = router;