const express = require('express');

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, isValidId, authenticate } = require('../../middlewars');
const {schemas} = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', authenticate, validateBody(schemas.addSchema, "missing required name field"), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema, "missing fields"), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema, "missing field favorite"), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;