const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

function showMenu() {
  console.log("\n📞 Phonebook Application");
  console.log("1. Add Contact");
  console.log("2. Update Contact");
  console.log("3. Delete Contact");
  console.log("4. View All Contacts");
  console.log("5. Search Contact");
  console.log("6. Exit");

  rl.question("\nEnter your choice: ", handleChoice);
}

function handleChoice(choice) {
  switch (choice) {
    case "1":
      addContact();
      break;
    case "2":
      updateContact();
      break;
    case "3":
      deleteContact();
      break;
    case "4":
      viewContacts();
      break;
    case "5":
      searchContact();
      break;
    case "6":
      console.log("Goodbye 👋");
      rl.close();
      break;
    default:
      console.log("Invalid choice!");
      showMenu();
  }
}

function addContact() {
  askName();
}

function askName() {
  rl.question("*Enter Name: ", (name) => {

    if (!name.trim()) {
      console.log("❌ Name is required!");
      askName();
      return;
    }

    askPhone(name);
  });
}

function askPhone(name) {
  rl.question("*Enter Phone: ", (phone) => {

    if (!phone.trim()) {
      console.log("❌ Phone number is required!");
      askPhone(name);
      return;
    }

    askEmail(name, phone);
  });
}

function askEmail(name, phone) {
  rl.question("Enter Email (optional): ", (email) => {

    const contacts = getContacts();

    const newContact = {
      id: generateId(contacts),
      name,
      phone,
      email: email || "",
    };

    contacts.push(newContact);
    saveContacts(contacts);

    console.log("✅ Contact added!");
    showMenu();
  });
}

function updateContact() {
  rl.question("Enter Contact ID to Update: ", (id) => {
    const contacts = getContacts();
    const contact = contacts.find((c) => c.id == id);

    if (!contact) {
      console.log("❌ Contact not found!");
      showMenu();
      return;
    }

    rl.question("New Name: ", (name) => {
      rl.question("New Phone: ", (phone) => {
        rl.question("New Email: ", (email) => {

          contact.name = name || contact.name;
          contact.phone = phone || contact.phone;
          contact.email = email !== "" ? email : contact.email;

          saveContacts(contacts);

          console.log("✅ Contact updated!");
          showMenu();
        });
      });
    });
  });
}

function deleteContact() {
  rl.question("Enter Contact ID to Delete: ", (id) => {
    const contacts = getContacts();

    const filtered = contacts.filter((c) => c.id != id);

    if (filtered.length === contacts.length) {
      console.log("❌ Contact not found!");
    } else {
      saveContacts(filtered);
      console.log("✅ Contact deleted!");
    }

    showMenu();
  });
}

function viewContacts() {
  const contacts = getContacts();

  if (contacts.length === 0) {
    console.log("No contacts found.");
  } else {
    console.table(contacts);
  }

  showMenu();
}

function searchContact() {
  rl.question("Enter name or phone: ", (query) => {
    const contacts = getContacts();

    const results = contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.phone.includes(query)
    );

    if (results.length === 0) {
      console.log("❌ No match found.");
    } else {
      console.table(results);
    }

    showMenu();
  });
}

showMenu();
