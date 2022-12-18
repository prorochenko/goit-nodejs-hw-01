const contactsOperations = require('./contacts');
const { Command } = require('commander');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone, data }) => {
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
      const newContact = await contactsOperations.addContact(name, email, phone);
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

invokeAction(argv);
