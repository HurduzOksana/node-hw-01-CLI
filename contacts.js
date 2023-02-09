const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = {
      id: Math.random(),
      name,
      email,
      phone,
    };
    const contactsList = JSON.stringify([newContact, ...contacts], null, "\t");
    await fs.writeFile(contactsPath, contactsList);
    console.log(newContact);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data).find((data) => data.id == contactId);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const index = await contacts.findIndex((el) => el.id === contactId);
    if (index === -1) {
      return null;
    }
    const removedContact = contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(removedContact);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
