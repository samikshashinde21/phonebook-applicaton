# Phonebook Application

## Overview

This is a CLI-based Phonebook application built using Node.js.  
It allows users to manage contacts with full CRUD functionality and search capabilities.


## How to Run the Application

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/samikshashinde21/phonebook-application.git
cd phonebook-application
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Run the Program
```bash
node script.js
```
The CLI menu will appear in the terminal.

## Design Decisions

### Separation of Concerns
- CLI logic, business logic, and validations are separated into different modules for better maintainability and scalability.

### File-Based Storage
- Contacts are stored in a local JSON file (contacts.json) to provide persistence without using a database.

### Validation
- Phone numbers must be exactly 10 digits
- Email format is validated using regex
- Duplicate phone numbers or emails are prevented

## Data Storage Details

- Contacts are stored in `contacts.json`
- Data is saved in the JSON format
- Data persists between program runs
- Contacts can be exported to `contacts.csv`