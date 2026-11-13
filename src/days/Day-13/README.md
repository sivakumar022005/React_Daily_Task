# React Optimistic Social Feed ❤️

A responsive Social Media Feed Application built using React.js, React 19, JavaScript, and Tailwind CSS. This project demonstrates Optimistic UI Updates, State Management, Event Handling, and asynchronous operations using React's `useOptimistic()` hook.

## 🚀 Features

- Display multiple social media posts.
- Display usernames and profile avatars.
- Display post content and timestamps.
- Like and unlike posts.
- Update like counts immediately.
- Add comments to posts.
- Display comments dynamically.
- Update comments immediately without waiting for the simulated server.
- Display the total number of comments.
- Show optimistic update status.
- Simulate asynchronous server requests.
- Use responsive layouts for mobile and desktop devices.
- Display empty comments messages.

## 🛠️ Technologies Used

- React.js 19
- JavaScript (ES6+)
- Tailwind CSS v4
- HTML5
- JSX

## 📚 React Concepts Practiced

| Concept               | Usage                                            |
| --------------------- | ------------------------------------------------ |
| `useState()`          | Manage posts and comment input values            |
| `useOptimistic()`     | Update likes and comments immediately            |
| `useTransition()`     | Handle asynchronous optimistic updates           |
| Components            | Organize the social feed interface               |
| `map()`               | Display posts and comments dynamically           |
| `setState()`          | Update actual post data                          |
| Spread Operator       | Update posts and comments immutably              |
| `filter()`            | Can be used to filter posts                      |
| `async/await`         | Handle asynchronous operations                   |
| `Promise`             | Simulate server response delays                  |
| Event Handling        | Handle likes and comment submissions             |
| Controlled Inputs     | Manage comment input fields                      |
| Conditional Rendering | Display empty comments and different like states |
| State Management      | Manage post interactions and comments            |
| Array Methods         | Update post and comment data                     |

## ❤️ Social Feed Functionality

### 1. Display Posts

Displays social media posts with usernames, profile avatars, timestamps, and post content.

### 2. Like and Unlike Posts

Allows users to like and unlike posts.

The like count updates immediately using the `useOptimistic()` hook.

### 3. Add Comments

Allows users to write and submit comments on individual posts.

New comments appear immediately without waiting for the simulated server response.

### 4. Display Comments

Displays all comments associated with each post using React's `map()` method.

### 5. Update Like Count

Updates the like count when users like or unlike a post.

### 6. Update Comment Count

Automatically updates the total number of comments after adding a new comment.

### 7. Optimistic UI Updates

Uses React's `useOptimistic()` hook to display temporary updates before the actual state is updated.

### 8. Simulate Server Requests

Uses JavaScript `Promise` and `setTimeout()` to simulate asynchronous server operations.

## ⚡ Understanding useOptimistic()

The `useOptimistic()` hook is available in React 19.

It allows applications to display an expected state immediately while an asynchronous operation is processing.

**Syntax:**

```javascript
const [optimisticState, addOptimistic] = useOptimistic(
  state,
  reducer
);
```

### Parameters

- `state` – The actual state.
- `reducer` – Function that determines how optimistic updates are applied.

### Return Values

- `optimisticState` – The temporary updated state.
- `addOptimistic` – Function used to apply optimistic updates.

### Example

```javascript
startTransition(async () => {
  addOptimistic({
    type: "LIKE",
    postId,
  });

  await delay(700);

  setPosts((currentPosts) =>
    postsReducer(currentPosts, {
      type: "LIKE",
      postId,
    })
  );
});
```

**How it works:**

1. User clicks the Like button.
2. The UI updates immediately.
3. A simulated server request starts.
4. The actual state updates after the operation completes.
5. The UI displays the confirmed state.

## 🔄 State Management

This project uses React hooks to manage social feed data.

The following states are used:

- `posts` – Stores all social media posts.
- `commentInputs` – Stores comment input values for individual posts.
- `optimisticPosts` – Stores the optimistic version of posts.
- `isPending` – Tracks pending transitions.
- `addOptimistic` – Applies optimistic state updates.

## ⚙️ Installation and Setup

### 1. Create a React Vite project

```bash
npm create vite@latest social-feed -- --template react
```

### 2. Navigate to the project folder

```bash
cd social-feed
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
src/App.jsx
```

Make sure `src/main.jsx` imports `./index.css` and `./App.jsx`.

### 9. Start the development server

```bash
npm start
```

Open the local URL displayed in your terminal to view the application.

## 🎯 Learning Objectives

- Understand React 19 features.
- Learn how to use the `useOptimistic()` hook.
- Understand optimistic UI updates.
- Learn how to use `useTransition()`.
- Understand asynchronous operations.
- Practice state management.
- Handle user interactions.
- Implement like and unlike functionality.
- Implement dynamic comment functionality.
- Understand reducers.
- Practice immutable state updates.
- Build interactive social media applications.
- Create responsive UI using Tailwind CSS.

## 🔮 Future Improvements

- Add user authentication.
- Add profile pages.
- Add image and video uploads.
- Connect to a backend API.
- Save posts in a database.
- Save likes and comments permanently.
- Add edit and delete comment functionality.
- Add delete post functionality.
- Add post creation functionality.
- Add post search functionality.
- Add notifications.
- Add real-time updates.
- Handle server errors and optimistic rollback.
- Add dark and light mode.

## 👨‍💻 Project Summary

This project demonstrates how to build an interactive social media feed using React 19 and the `useOptimistic()` hook.

It provides practical experience with optimistic UI updates, asynchronous operations, state management, likes, comments, and responsive design.

**Note:** This is a frontend demonstration project. Server requests are simulated using JavaScript promises and delays. Posts, likes, and comments are not saved permanently.
