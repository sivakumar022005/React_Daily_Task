
import React, { useState, useEffect } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  CalendarDays,
} from "lucide-react";
import SummaryCard from "./components/SummaryCard";
import TransactionTable from "./components/TransactionTable";
import TransactionForm from "./components/TransactionForm";

function Day8() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("expense-tracker-data");
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: "Monthly Salary",
        amount: 25000,
        type: "Income",
        category: "Salary",
        date: "2026-11-01",
      },
      {
        id: 2,
        title: "Food & Groceries",
        amount: 2500,
        type: "Expense",
        category: "Food",
        date: "2026-11-02",
      },
      {
        id: 3,
        title: "Bus Travel",
        amount: 500,
        type: "Expense",
        category: "Transport",
        date: "2026-11-03",
      },
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "Expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    localStorage.setItem(
      "expense-tracker-data",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const totalIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((total, item) => total + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((total, item) => total + item.amount, 0);

  const balance = totalIncome - totalExpense;

  const addTransaction = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || Number(formData.amount) <= 0) {
      alert("Please enter valid transaction details");
      return;
    }

    const newTransaction = {
      ...formData,
      id: Date.now(),
      amount: Number(formData.amount),
    };

    setTransactions([newTransaction, ...transactions]);
    setFormData({
      title: "",
      amount: "",
      type: "Expense",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    });
    setShowForm(false);
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((item) => item.id !== id)
    );
  };

  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpense = transactions
    .filter((item) => {
      const date = new Date(item.date + "T00:00:00");
      return (
        item.type === "Expense" &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((total, item) => total + item.amount, 0);

  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Bills",
    "Health",
    "Education",
    "Salary",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2 rounded-xl">
              <Wallet size={25} />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Smart Expense
              </h1>
              <p className="text-xs text-slate-500">
                Personal Finance Manager
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Dashboard Overview
          </h2>
          <p className="text-slate-500 mt-1">
            Track your income, expenses and savings.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <SummaryCard
            title="Total Balance"
            amount={formatCurrency(balance)}
            icon={Wallet}
            iconColor="text-indigo-600"
            amountColor="text-indigo-600"
            subtitle="Available balance"
          />
          <SummaryCard
            title="Total Income"
            amount={formatCurrency(totalIncome)}
            icon={TrendingUp}
            iconColor="text-green-600"
            amountColor="text-green-600"
            subtitle="Money received"
          />
          <SummaryCard
            title="Total Expenses"
            amount={formatCurrency(totalExpense)}
            icon={TrendingDown}
            iconColor="text-red-500"
            amountColor="text-red-500"
            subtitle="Money spent"
          />
          <SummaryCard
            title="This Month"
            amount={formatCurrency(monthlyExpense)}
            icon={CalendarDays}
            iconColor="text-orange-500"
            amountColor="text-orange-500"
            subtitle="Monthly expenses"
          />
        </div>

        {/* Income and Expense Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h3 className="font-bold text-lg mb-5">
            Financial Overview
          </h3>

          <div className="mb-5">
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-medium">Income</span>
              <span className="text-green-600">
                {formatCurrency(totalIncome)}
              </span>
            </div>

            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{
                  width: `${
                    totalIncome + totalExpense > 0
                      ? (totalIncome / (totalIncome + totalExpense)) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-medium">Expenses</span>
              <span className="text-red-500">
                {formatCurrency(totalExpense)}
              </span>
            </div>

            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{
                  width: `${
                    totalIncome + totalExpense > 0
                      ? (totalExpense / (totalIncome + totalExpense)) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl shadow-sm p-6">

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold">
                Recent Transactions
              </h3>
              <p className="text-sm text-slate-500">
                Manage your financial activities
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border rounded-xl px-3">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search transaction..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="p-2 outline-none w-full"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded-xl px-3 py-2 outline-none"
              >
                <option>All</option>
                <option>Income</option>
                <option>Expense</option>
              </select>
            </div>
          </div>

          <TransactionTable
            transactions={filteredTransactions}
            onDelete={deleteTransaction}
            formatCurrency={formatCurrency}
          />
        </div>

      </main>

      <TransactionForm
        showForm={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={addTransaction}
        formData={formData}
        onFormChange={setFormData}
        categories={categories}
      />

      <footer className="text-center py-5 text-sm text-slate-400">
        Smart Expense Tracker | Built with React & Tailwind CSS
      </footer>

    </div>
  );
}

export default Day8
