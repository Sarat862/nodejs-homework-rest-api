const express = require('express');

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewars');
const schemas = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

router.post('/', validateBody(schemas.addSchema, "missing required name field"), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', validateBody(schemas.addSchema, "missing fields"), ctrlWrapper(ctrl.updateContact));

module.exports = router;
