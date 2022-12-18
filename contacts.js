const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'db', 'contacts.json');
const { v4: uuid } = require('uuid');

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find(contact => contact.id === contactId);
  if (!contact) {
    throw new Error('Contact not found');
  }
  return contact;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    throw new Error('Contact not found');
  }

  const [removeContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return removeContact;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const contact = {
    id: uuid(),
    name: name,
    email: email,
    phone: phone,
  };

  allContacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return contact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
