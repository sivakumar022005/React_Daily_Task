# Smart Movie Explorer 🎬

A responsive Movie Details Dashboard built using React.js 19, JavaScript, and Tailwind CSS v4. This project demonstrates React's `use()` hook, Suspense, Promises, asynchronous operations, and dynamic movie selection.

## 🚀 Features

- Display a collection of movies.
- Display movie titles and release years.
- Display movie ratings.
- Display movie genres.
- Search movies by title.
- Filter movies by genre.
- View detailed movie information.
- Display movie descriptions.
- Display director information.
- Display movie duration and language.
- Display main cast members.
- Show loading animation using React Suspense.
- Load movie details asynchronously using Promises.
- Display a movie not-found message.
- Responsive UI for mobile and desktop devices.

## 🛠️ Technologies Used

- React.js 19
- JavaScript (ES6+)
- Tailwind CSS v4
- HTML5
- JSX
- JavaScript Promises

## 📚 React Concepts Practiced

| Concept               | Usage                                                   |
| --------------------- | ------------------------------------------------------- |
| `use()`               | Read and resolve Promise values inside React components |
| `Suspense`            | Display fallback UI while movie details are loading     |
| `useState()`          | Manage selected movie, search, and genre                |
| `Promise`             | Handle asynchronous movie data                          |
| `setTimeout()`        | Simulate asynchronous loading                           |
| `Map`                 | Cache movie Promises                                    |
| `map()`               | Display movies and cast members dynamically             |
| `filter()`            | Search and filter movies                                |
| `find()`              | Find the selected movie                                 |
| Conditional Rendering | Display loading, empty, and movie detail states         |
| Components            | Organize the dashboard into reusable components         |
| Event Handling        | Handle movie selection and search interactions          |
| Controlled Inputs     | Manage search and genre filter values                   |

## 🎬 Movie Explorer Functionality

### 1. Display Movies

Displays a collection of movies with their titles, release years, genres, ratings, and emoji-based artwork.

### 2. Search Movies

Allows users to search for movies by title using JavaScript's `filter()` and `includes()` methods.

### 3. Filter Movies

Allows users to filter movies based on genres such as:

- Sci-Fi
- Adventure
- Action
- Fantasy
- Drama

### 4. Select a Movie

Users can select a movie from the movie list to view its complete details.

### 5. Movie Details Dashboard

Displays the following information:

- Movie title
- Release year
- Genre
- Rating
- Duration
- Language
- Description
- Director
- Main cast

### 6. Asynchronous Movie Loading

Uses JavaScript Promises and `setTimeout()` to simulate asynchronous movie detail loading.

### 7. Loading Animation

Uses React's `Suspense` component to display a loading animation while movie details are being loaded.

### 8. Movie Promise Caching

Uses JavaScript's `Map` to cache movie Promises and reuse them instead of creating a new Promise on every render.

## ⚡ Understanding the use() Hook

The `use()` hook is a React 19 feature that allows components to read the value of a Promise.

**Syntax:**

```javascript
import { use } from "react";

function MovieDetails({ moviePromise }) {
  const movie = use(moviePromise);

  return <h1>{movie.title}</h1>;
}
```

### How It Works

1. A Promise is created to load movie details.
2. The Promise is passed to the MovieDetails component.
3. The `use()` hook reads the Promise.
4. If the Promise is pending, React suspends the component.
5. Suspense displays its fallback UI.
6. When the Promise resolves, React renders the movie details.

## 🔄 Understanding Suspense

React's `Suspense` component allows us to display fallback content while a child component is waiting for a supported asynchronous operation.

**Example:**

```jsx
<Suspense fallback={<p>Loading Movie Details...</p>}>
  <MovieDetails moviePromise={moviePromise} />
</Suspense>
```

In this project, Suspense displays a loading animation while the movie Promise is pending.

## 🔄 State Management

This project uses React's `useState()` hook to manage application data.

The following states are used:

- `selectedMovieId` – Stores the currently selected movie ID.
- `search` – Stores the movie search input.
- `genre` – Stores the selected movie genre.

## ⚙️ Installation and Setup

### 1. Create a React Vite project

```bash
npx create_app movie-explorer -- --template react
```

### 2. Navigate to the project folder

```bash
cd movie-explorer
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

- Understand React 19 features.
- Learn how to use the `use()` hook.
- Understand how Promises work in React.
- Learn how to use React Suspense.
- Understand asynchronous rendering.
- Display loading states using Suspense.
- Practice Promise caching.
- Understand React state management.
- Practice JavaScript array methods.
- Implement dynamic search and filtering.
- Build reusable React components.
- Create responsive dashboards using Tailwind CSS.

## 🔮 Future Improvements

- Integrate a real movie API such as TMDB.
- Display real movie posters.
- Add movie trailers.
- Add movie cast profiles.
- Add movie recommendations.
- Add movie watchlists.
- Add favorite movies functionality.
- Add pagination.
- Add movie sorting.
- Add user authentication.
- Add dark and light mode.
- Add error handling for failed API requests.
- Add a backend database.
- Add persistent movie favorites using `localStorage`.

## 👨‍💻 Project Summary

This project demonstrates how to build a Movie Details Dashboard using React 19's `use()` hook, Suspense, and JavaScript Promises.

It provides practical experience with asynchronous operations, Promise handling, loading states, dynamic movie selection, search, filtering, and reusable React components.

**Note:** This is a frontend demonstration project. Movie information comes from a static sample dataset, and asynchronous loading is simulated using JavaScript Promises and `setTimeout()`. It does not connect to a real movie API.
