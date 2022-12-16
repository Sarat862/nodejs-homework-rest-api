const express = require('express');

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, isValidId } = require('../../middlewars');
const {schemas} = require('../../models/contact');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', validateBody(schemas.addSchema, "missing required name field"), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', isValidId, validateBody(schemas.addSchema, "missing fields"), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema, "missing field favorite"), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;