# React Notes Application 📝

A responsive Notes Application built using React.js, JavaScript, and Tailwind CSS. This project demonstrates CRUD operations, React Hooks, state management, and browser localStorage.

## 🚀 Features

- Create new notes.
- Display all saved notes.
- Edit existing notes.
- Delete notes.
- Search notes by title.
- Search notes by description.
- Display the total number of notes.
- Validate note title and description.
- Show error messages for empty inputs.
- Display an empty notes message.
- Add and update notes using a single form.
- Save notes using browser localStorage.
- Maintain notes after refreshing the browser.
- Responsive UI for mobile and desktop devices.

## 🛠️ Technologies Used

- React.js
- JavaScript (ES6+)
- Tailwind CSS
- HTML5
- JSX
- Browser localStorage

## 📚 React Concepts Practiced

| Concept                  | Usage                                                               |
| ------------------------ | ------------------------------------------------------------------- |
| `useState()`             | Store and manage notes, title, description, search, and edit states |
| `useEffect()`            | Save notes to localStorage whenever notes change                    |
| CRUD Operations          | Create, Read, Update, and Delete notes                              |
| `map()`                  | Display notes dynamically                                           |
| `filter()`               | Search and delete notes                                             |
| `Date.now()`             | Generate a unique ID for each new note                              |
| Spread Operator          | Update note objects without directly modifying state                |
| `localStorage.setItem()` | Save notes in browser storage                                       |
| `localStorage.getItem()` | Retrieve previously saved notes                                     |
| `JSON.stringify()`       | Convert notes into JSON strings                                     |
| `JSON.parse()`           | Convert JSON strings into JavaScript objects                        |
| Controlled Inputs        | Manage title and description input values                           |
| Conditional Rendering    | Display Add Note or Update Note buttons                             |
| Event Handling           | Handle form submission, editing, and deleting                       |

## 📝 CRUD Operations

CRUD stands for Create, Read, Update, and Delete.

### 1. Create

Allows users to add new notes with a title and description.

### 2. Read

Displays all saved notes dynamically using the `map()` method.

### 3. Update

Allows users to edit an existing note and save the updated information.

### 4. Delete

Removes a selected note from the notes list.

## 💾 Local Storage Integration

This project uses browser localStorage to save notes.

### 1. Save Notes

```javascript
localStorage.setItem("my-notes", JSON.stringify(notes));
```

### 2. Get Saved Notes

```javascript
const savedNotes = localStorage.getItem("my-notes");
```

### 3. Convert JSON to JavaScript

```javascript
JSON.parse(savedNotes);
```

Notes remain available after refreshing the browser on the same device and browser.

## ⚙️ Installation and Setup

### 1. Navigate to the project folder

```bash
cd day9
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Tailwind CSS

For Tailwind CSS v4 with Vite:

```bash
npm install tailwindcss @tailwindcss/vite
```

### 4. Start the development server

```bash
npm start
```

Open the local URL displayed in your terminal to view the application.

## 🎯 Learning Objectives

- Understand CRUD operations in React.
- Learn how to manage state using `useState()`.
- Understand how to use `useEffect()`.
- Create, read, update, and delete data.
- Understand controlled components.
- Practice array methods such as `map()` and `filter()`.
- Understand the spread operator.
- Implement search functionality.
- Understand browser localStorage.
- Store and retrieve data using JSON.
- Handle form validation.
- Build responsive UI using Tailwind CSS.

## 🔮 Future Improvements

- Add note categories.
- Add note creation date and time.
- Add a Clear All Notes button.
- Add a favorite notes feature.
- Add different background colors for notes.
- Add sorting by newest and oldest.
- Add a dark and light mode.
- Add note pinning functionality.
- Add a backend database.
- Add user authentication.
