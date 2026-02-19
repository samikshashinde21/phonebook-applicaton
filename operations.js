const fs = require("fs");

const DATA_FILE = "contacts.json";

function getContacts() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]");
    return [];
  }

  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data || "[]");
}

function saveContacts(contacts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
}

function generateId(contacts) {
  return contacts.length > 0
    ? contacts[contacts.length - 1].id + 1
    : 1;
}

function addContact(name, phone, email) {
  const contacts = getContacts();

  const newContact = {
    id: generateId(contacts),
    name,
    phone,
    email: email || "",
  };

  contacts.push(newContact);
  saveContacts(contacts);
}

function updateContact(id, name, phone, email) {
  const contacts = getContacts();

  const contact = contacts.find((c) => c.id == id);

  if (!contact) return false;

  contact.name = name || contact.name;
  contact.phone = phone || contact.phone;
  contact.email = email !== "" ? email : contact.email;

  saveContacts(contacts);
  return true;
}

function deleteContact(id) {
  const contacts = getContacts();

  const filtered = contacts.filter((c) => c.id != id);

  if (filtered.length === contacts.length) return false;

  saveContacts(filtered);
  return true;
}

function getAllContacts() {
  return getContacts();
}

function searchContacts(query) {
  const contacts = getContacts();

  return contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query)
  );
}

module.exports = {
  addContact,
  updateContact,
  deleteContact,
  getAllContacts,
  searchContacts,
};
