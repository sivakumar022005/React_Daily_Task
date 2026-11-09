# React Expense Tracker 💰

A responsive Expense Tracker Application built using React.js, JavaScript, and Tailwind CSS. This project demonstrates React Forms, State Management, Event Handling, and dynamic calculations.

## 🚀 Features

- Add new income transactions.
- Add new expense transactions.
- Enter transaction title and amount.
- Select transaction type (Income or Expense).
- Select transaction categories.
- Display total income.
- Display total expenses.
- Calculate available balance automatically.
- Display transaction history.
- Delete individual transactions.
- Display transaction category and date.
- Validate form inputs.
- Show error messages for invalid amounts.
- Display an empty transaction message.
- Responsive UI for mobile and desktop devices.

## 🛠️ Technologies Used

- React.js
- JavaScript (ES6+)
- Tailwind CSS
- HTML5
- JSX

## 📚 React Concepts Practiced

| Concept               | Usage                                              |
| --------------------- | -------------------------------------------------- |
| `useState()`          | Store and manage transactions and form data        |
| Controlled Inputs     | Manage form fields using React state               |
| `onChange`            | Update input values                                |
| `onSubmit`            | Handle form submission                             |
| `preventDefault()`    | Prevent page refresh during form submission        |
| `filter()`            | Filter income and expenses and delete transactions |
| `reduce()`            | Calculate total income and expenses                |
| `map()`               | Display transactions dynamically                   |
| `Date.now()`          | Generate unique transaction IDs                    |
| Spread Operator       | Add transactions without directly modifying state  |
| Conditional Rendering | Display transactions or an empty message           |
| Template Literals     | Apply dynamic CSS classes                          |
| Form Validation       | Validate transaction title and amount              |
| State Management      | Manage transaction data and calculate totals       |

## 💰 Expense Tracker Functionality

### 1. Add Income

Allows users to add income transactions with a title, amount, and category.

### 2. Add Expenses

Allows users to add expense transactions with a title, amount, and category.

### 3. Delete Transaction

Removes a selected transaction from the transaction history.

### 4. Calculate Total Income

Calculates the total amount of all income transactions using `filter()` and `reduce()`.

```javascript
const totalIncome = transactions
  .filter((item) => item.type === "income")
  .reduce((total, item) => total + item.amount, 0);
```

### 5. Calculate Total Expenses

Calculates the total amount of all expense transactions.

```javascript
const totalExpense = transactions
  .filter((item) => item.type === "expense")
  .reduce((total, item) => total + item.amount, 0);
```

### 6. Calculate Available Balance

Calculates the remaining balance by subtracting total expenses from total income.

```javascript
const balance = totalIncome - totalExpense;
```

**Formula:**

```text
Available Balance = Total Income - Total Expenses
```

## 📝 Form Handling

This project uses controlled inputs to manage transaction details.

The form contains:

- Transaction Title
- Amount
- Transaction Type
- Category

The `handleChange()` function updates form values, and the `handleSubmit()` function validates and adds a new transaction.

## ⚙️ Installation and Setup

### 1. Navigate to the project folder

```bash
cd day10
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

- Understand React Forms.
- Learn how to manage form data using `useState()`.
- Understand controlled components.
- Handle form submission and input changes.
- Practice form validation.
- Understand JavaScript array methods such as `map()`, `filter()`, and `reduce()`.
- Perform calculations using JavaScript.
- Understand how to add and delete transactions.
- Learn dynamic state management.
- Build responsive UI using Tailwind CSS.

## 🔮 Future Improvements

- Add an Edit Transaction feature.
- Add transaction search functionality.
- Add date selection.
- Add income and expense filters.
- Add monthly and yearly reports.
- Add expense category charts.
- Save transactions using `localStorage`.
- Add a Clear All Transactions button.
- Add transaction sorting.
- Add a dark and light mode.
- Connect the application to a backend API.
- Add user authentication.
