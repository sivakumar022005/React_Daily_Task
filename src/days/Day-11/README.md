# React Quiz Application 🧠

A responsive Quiz Application built using React.js, JavaScript, and Tailwind CSS. This project demonstrates React State Management, Conditional Rendering, Event Handling, and dynamic UI updates.

## 🚀 Features

- Display multiple-choice questions.
- Show four answer options for each question.
- Allow users to select an answer.
- Check answers automatically.
- Display correct and incorrect answer feedback.
- Prevent users from selecting multiple answers.
- Track the user's score.
- Display the current question number.
- Show quiz progress using a progress bar.
- Display the final quiz result.
- Calculate the score percentage.
- Display different messages based on the final score.
- Restart the quiz.
- Responsive UI for mobile and desktop devices.

## 🛠️ Technologies Used

- React.js
- JavaScript (ES6+)
- Tailwind CSS
- HTML5
- JSX

## 📚 React Concepts Practiced

| Concept               | Usage                                                           |
| --------------------- | --------------------------------------------------------------- |
| `useState()`          | Store and manage questions, selected answers, score, and result |
| Components            | Build the quiz application using React components               |
| `map()`               | Display answer options dynamically                              |
| `onClick`             | Handle answer selection and button clicks                       |
| Conditional Rendering | Display questions, feedback, and result screens                 |
| Ternary Operator      | Display different messages based on conditions                  |
| `disabled`            | Prevent selecting multiple answers                              |
| Template Literals     | Apply dynamic Tailwind CSS classes                              |
| State Updates         | Update score and navigate between questions                     |
| `Math.round()`        | Calculate the final score percentage                            |
| Event Handling        | Handle user interactions                                        |

## 🧠 Quiz Application Functionality

### 1. Display Questions

Displays multiple-choice questions with four answer options.

### 2. Select Answer

Allows users to select one answer for each question.

### 3. Check Answer

Checks whether the selected answer matches the correct answer and displays feedback.

### 4. Score Calculation

Increases the score by one whenever the user selects the correct answer.

### 5. Question Navigation

Moves to the next question after the user selects an answer.

### 6. Progress Bar

Displays the user's current progress through the quiz.

### 7. Final Result

Displays the final score and percentage after completing all questions.

**Formula:**

```text
Percentage = (Score / Total Questions) × 100
```

### 8. Restart Quiz

Resets the question number, selected answer, score, and result state so the user can play again.

## 🔄 State Management

This project uses React's `useState()` hook to manage quiz data.

The following states are used:

- `currentQuestion` – Stores the current question index.
- `selectedAnswer` – Stores the selected answer.
- `score` – Stores the user's total score.
- `showResult` – Controls whether the result screen is displayed.
- `answered` – Checks whether the current question has been answered.

## ⚙️ Installation and Setup

### 1. Navigate to the project folder

```bash
cd day11
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

- Understand React State Management.
- Learn how to use the `useState()` hook.
- Understand conditional rendering.
- Handle button click events.
- Display dynamic content using `map()`.
- Understand the ternary operator.
- Update state based on user interactions.
- Implement answer validation.
- Calculate scores and percentages.
- Build interactive applications using React.
- Create responsive UI using Tailwind CSS.

## 🔮 Future Improvements

- Add more quiz questions.
- Add a Previous Question button.
- Add a timer for each question.
- Add different quiz categories.
- Add difficulty levels.
- Randomize question order.
- Display correct and incorrect answer counts.
- Save the highest score using `localStorage`.
- Add sound effects.
- Add a leaderboard.
- Add a quiz review page.
- Connect the application to a backend API.
