const contactsOperations = require('./contacts');

const invokeAction = async ({ action, id, data }) => {
  switch (action) {
    case 'getAll':
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;
    case 'getById':
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;
    case 'add':
      const newContact = await contactsOperations.addContact(data);
      console.log(newContact);
      break;
    case 'remove':
      const removeContact = await contactsOperations.removeContact(id);
      console.log('removed:', removeContact);

      break;

    default:
      console.log('unknown action');
  }
};

// const newContact = {
//   name: 'Siomollln Mortoon',
//   email: 'duoi.Fusce.diam@Donec.ocom',
//   phone: '(233) 70000038-2360',
// };

invokeAction({ action: 'remove', id: 'd9027402-ea49-4f5d-8a54-750603146ab0' });
