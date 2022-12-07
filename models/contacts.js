const fs = require("fs").promises;
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const contactStringId = String(contactId);
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactStringId);
    return result || null;
  } catch (error) {
    console.log(error.message);
  }
  
}

const removeContact = async (contactId) => {
  try {
    const contactStringId = String(contactId);
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contactStringId === contact.id);

    if (index === -1) {
      return null;
    }

    const [result] = contacts.splice(index, 1)
    await updateContacts(contacts);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

const addContact = async ({name, email, phone}) => {
  try {
    const contacts = await listContacts();
    const newContact = {id: nanoid(), name, email, phone};
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => id === contact.id);

    if (index === -1) {
      return null;
    }

    contacts[index] = { id, ...body };
    await updateContacts(contacts);
    return contacts[index];
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
