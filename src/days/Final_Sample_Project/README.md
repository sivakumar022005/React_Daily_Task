# WebCraft – Website Builder 🌐

A responsive Website Builder Application built using React.js 19, JavaScript, and Tailwind CSS v4. This project demonstrates advanced React concepts, including Props, Context API, useReducer, Custom Hooks, useMemo, useCallback, useOptimistic, useActionState, Suspense, Portals, Lazy Loading, and Error Boundaries.

## 🚀 Features

- Build websites using a visual editor.
- Add heading elements.
- Add text elements.
- Add button elements.
- Add card elements.
- Select and edit website elements.
- Update element content dynamically.
- Change text colors.
- Change background colors.
- Change font sizes.
- Delete selected elements.
- Move elements up and down.
- Display a live website canvas.
- Preview the generated website.
- Display editor settings in a modal.
- Save website information using localStorage.
- Display website statistics.
- Show optimistic UI updates.
- Load template information asynchronously.
- Display loading animations using Suspense.
- Load advanced settings on demand.
- Handle rendering errors using Error Boundaries.
- Responsive UI for mobile and desktop devices.

## 🛠️ Technologies Used

- React.js 19
- JavaScript (ES6+)
- Tailwind CSS v4
- HTML5
- JSX
- Browser localStorage
- React Context API
- JavaScript Promises

## 📚 React Concepts Practiced

| Concept                 | Usage                                              |
| ----------------------- | -------------------------------------------------- |
| Props                   | Pass component configurations to website elements  |
| `useState()`            | Manage editor state, selected elements, and modals |
| `useEffect()`           | Synchronize editor data with localStorage          |
| `useContext()`          | Share editor state across components               |
| `useReducer()`          | Manage complex editor actions                      |
| Custom Hooks            | Create reusable editor logic                       |
| `useRef()`              | Access DOM elements and focus the editor input     |
| `useMemo()`             | Optimize expensive statistics calculations         |
| `useCallback()`         | Optimize event callbacks                           |
| `React.memo()`          | Prevent unnecessary component renders              |
| `useTransition()`       | Keep editor interactions responsive                |
| `useOptimistic()`       | Display new elements immediately                   |
| `useActionState()`      | Manage asynchronous website saving                 |
| `use()`                 | Read Promise-based template data                   |
| `Suspense`              | Handle asynchronous loading                        |
| Error Boundaries        | Handle rendering errors                            |
| Lazy Loading            | Load settings modules on demand                    |
| Portals                 | Render floating panels and modals                  |
| Reconciliation & Keys   | Efficiently render dynamic elements                |
| Component Configuration | Configure website element properties               |

## 🌐 Website Builder Functionality

### 1. Website Details

Allows users to enter a website name and displays basic website statistics.

### 2. Add Website Elements

Allows users to add different elements to the website canvas:

- Heading
- Text
- Button
- Card

### 3. Edit Website Elements

Allows users to select an element and update its content, text color, background color, and font size.

### 4. Move Elements

Allows users to move website elements up and down using editor controls.

### 5. Delete Elements

Allows users to remove selected elements from the website canvas.

### 6. Live Website Canvas

Displays website elements dynamically whenever the editor state changes.

### 7. Website Preview

Uses React Portals to display a preview modal outside the main editor layout.

### 8. Editor Settings

Displays website information and provides an option to reset the website.

### 9. Save Website

Uses React's `useActionState()` hook to manage an asynchronous save action.

Website name and editor data are saved in browser localStorage.

### 10. Optimistic UI Updates

Uses `useOptimistic()` to display newly added website elements immediately while a simulated asynchronous operation is processing.

### 11. Template Library

Uses JavaScript Promises and React's `use()` hook to load template information asynchronously.

### 12. Loading Animation

Uses React's `Suspense` component to display fallback content while template data is loading.

### 13. Lazy Loading

Uses `React.lazy()` to load the advanced settings panel when required.

### 14. Error Handling

Uses an Error Boundary class component to catch rendering errors in website blocks.

### 15. Website Statistics

Displays the following information:

- Total elements
- Total headings
- Total buttons
- Total content characters

## ⚡ Understanding useReducer()

The `useReducer()` hook is useful for managing complex state logic in React applications.

**Syntax:**

```javascript
const [state, dispatch] = useReducer(
  reducer,
  initialState
);
```

### Reducer Actions

This project uses different reducer actions:

- `ADD_BLOCK` – Add a new website element.
- `UPDATE_BLOCK` – Update an existing element.
- `DELETE_BLOCK` – Delete an element.
- `MOVE_BLOCK` – Change the element position.
- `LOAD_BLOCKS` – Load website elements.

**Example:**

```javascript
function editorReducer(state, action) {
  switch (action.type) {
    case "ADD_BLOCK":
      return [...state, action.block];

    case "DELETE_BLOCK":
      return state.filter(
        (block) => block.id !== action.id
      );

    default:
      return state;
  }
}
```

## ⚡ Understanding useOptimistic()

The `useOptimistic()` hook is available in React 19.

It allows the UI to display expected updates immediately while an asynchronous operation is processing.

**Syntax:**

```javascript
const [optimisticState, addOptimistic] =
  useOptimistic(state, reducer);
```

In this project, new website elements appear immediately while a simulated asynchronous operation runs.

## ⚡ Understanding useActionState()

The `useActionState()` hook manages state associated with an action, including asynchronous form submissions.

**Syntax:**

```javascript
const [state, formAction, isPending] =
  useActionState(action, initialState);
```

In this project, it handles the website save action and displays saving status and success or validation messages.

## 🔄 State Management

This project combines multiple React state management techniques.

The following states are used:

- `blocks` – Stores all website elements.
- `selectedId` – Stores the currently selected element.
- `activeTab` – Controls the sidebar tab.
- `showPreview` – Controls the website preview modal.
- `showSettings` – Controls the settings modal.
- `websiteName` – Stores the website name.
- `optimisticBlocks` – Stores the temporary optimistic editor state.
- `isPending` – Tracks pending transitions.
- `saveState` – Stores website save messages.

## 💾 Local Storage

This project uses browser localStorage to save website information.

The following data is stored:

- Website name.
- Website element configurations.

**Example:**

```javascript
localStorage.setItem(
  "webcraft-blocks",
  JSON.stringify(blocks)
);
```

**Note:** The current demonstration saves data to localStorage, but does not automatically restore saved website data when the application reloads. That can be implemented as a future improvement.

## ⚙️ Installation and Setup

### 1. Create a React Vite project

```bash
npx create_app  webcraft -- --template react
```

### 2. Navigate to the project folder

```bash
cd webcraft
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install React 19

```bash
npm install react@^19 react-dom@^19
```

### 5. Install Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/vite
```

### 6. Configure `vite.config.js`

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 7. Update `src/index.css`

```css
@import "tailwindcss";
```

### 8. Add the application code

Copy the complete React application code into:

```text
src/App.js
```

Make sure `src/main.jsx` imports `./index.css` and `./App.jsx`.

### 9. Start the development server

```bash
npm start
```

Open the local URL displayed in your terminal to view the application.

## 🎯 Learning Objectives

- Understand advanced React 19 features.
- Learn component communication using Props.
- Understand Context API.
- Manage complex state using `useReducer()`.
- Create reusable Custom Hooks.
- Understand DOM references using `useRef()`.
- Optimize performance using `useMemo()` and `useCallback()`.
- Understand component memoization using `React.memo()`.
- Learn asynchronous transitions using `useTransition()`.
- Implement optimistic UI updates.
- Manage asynchronous actions using `useActionState()`.
- Understand Promise handling using `use()`.
- Implement Suspense and Lazy Loading.
- Handle rendering errors using Error Boundaries.
- Understand React Portals.
- Practice dynamic rendering and unique keys.
- Build an interactive website editor.
- Create responsive interfaces using Tailwind CSS.

## 🔮 Future Improvements

- Add image upload functionality.
- Add video elements.
- Add navigation bar builder.
- Add footer builder.
- Add drag-and-drop functionality.
- Add undo and redo functionality.
- Add website themes and templates.
- Add responsive device previews.
- Add custom font selection.
- Add element duplication.
- Add website export functionality.
- Generate downloadable HTML and CSS.
- Restore saved website data after page reload.
- Connect to a backend API.
- Add user authentication.
- Save multiple websites.
- Add database integration.
- Add a publishing system.
- Add collaborative editing.

## 👨‍💻 Project Summary

WebCraft is an advanced React Website Builder project that combines multiple React concepts into a single interactive application.

It provides practical experience with component configuration, state management, Context API, reducers, custom hooks, performance optimization, asynchronous actions, optimistic updates, Suspense, lazy loading, Error Boundaries, and Portals.

**Note:** This is a frontend learning demonstration. Website saving uses browser localStorage, and asynchronous operations are simulated. It does not generate production-ready websites or publish them to a hosting server.
