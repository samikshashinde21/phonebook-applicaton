const readline = require("readline");
const { isValidPhone, isValidEmail } = require("./validations");

const {
  addContact,
  updateContact,
  deleteContact,
  getAllContacts,
  searchContacts,
} = require("./operations");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
      addContactFlow();
      break;
    case "2":
      updateContactFlow();
      break;
    case "3":
      deleteContactFlow();
      break;
    case "4":
      viewContacts();
      break;
    case "5":
      searchContactFlow();
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

function addContactFlow() {
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

    if (!isValidPhone(phone)) {
      console.log("❌ Phone must be exactly 10 digits!");
      askPhone(name);
      return;
    }

    askEmail(name, phone);
  });
}


function askEmail(name, phone) {
  rl.question("Enter Email (optional): ", (email) => {

    if (email.trim() && !isValidEmail(email)) {
      console.log("❌ Invalid email format!");
      askEmail(name, phone);
      return;
    }

    addContact(name, phone, email);

    console.log("✅ Contact added!");
    showMenu();
  });
}

function updateContactFlow() {
  rl.question("Enter Contact ID to Update: ", (id) => {
    rl.question("New Name: ", (name) => {
      rl.question("New Phone: ", (phone) => {

        if (phone.trim() && !isValidPhone(phone)) {
          console.log("❌ Phone must be exactly 10 digits!");
          showMenu();
          return;
        }

        rl.question("New Email: ", (email) => {

          if (email.trim() && !isValidEmail(email)) {
            console.log("❌ Invalid email format!");
            showMenu();
            return;
          }

          const success = updateContact(id, name, phone, email);

          if (!success) {
            console.log("❌ Contact not found!");
          } else {
            console.log("✅ Contact updated!");
          }

          showMenu();
        });
      });
    });
  });
}

function deleteContactFlow() {
  rl.question("Enter Contact ID to Delete: ", (id) => {

    rl.question("Are you sure you want to delete this contact? (y/n): ", (ans) => {

      if (ans.toLowerCase() !== "y") {
        console.log("❎ Delete cancelled.");
        showMenu();
        return;
      }

      const success = deleteContact(id);

      if (!success) {
        console.log("❌ Contact not found!");
      } else {
        console.log("✅ Contact deleted!");
      }

      showMenu();
    });
  });
}

function viewContacts() {
  const contacts = getAllContacts();

  if (contacts.length === 0) {
    console.log("No contacts found.");
  } else {
    console.table(contacts);
  }

  showMenu();
}

function searchContactFlow() {
  rl.question("Enter name or phone: ", (query) => {
    const results = searchContacts(query);

    if (results.length === 0) {
      console.log("❌ No match found.");
    } else {
      console.table(results);
    }

    showMenu();
  });
}

showMenu();
