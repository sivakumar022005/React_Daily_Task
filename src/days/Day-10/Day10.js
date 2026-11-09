
import { useState } from "react";

function Day10() {
  const [transactions, setTransactions] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add transaction
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.amount) {
      setError("Please fill in all fields.");
      return;
    }

    if (Number(formData.amount) <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: formData.title.trim(),
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      date: new Date().toLocaleDateString(),
    };

    setTransactions((prev) => [...prev, newTransaction]);

    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
    });

    setError("");
  };

  // Delete transaction
  const handleDelete = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  // Calculate income
  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  // Calculate expenses
  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  // Calculate balance
  const balance = totalIncome - totalExpense;

  const formatAmount = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
            Expense Tracker 💰
          </h1>
          <p className="text-slate-400 mt-2">
            Manage your income and expenses
          </p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <p className="text-slate-400 text-sm">Total Balance</p>
            <h2 className="text-2xl font-bold text-cyan-400 mt-2">
              {formatAmount(balance)}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <p className="text-slate-400 text-sm">Total Income</p>
            <h2 className="text-2xl font-bold text-green-400 mt-2">
              {formatAmount(totalIncome)}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <p className="text-slate-400 text-sm">Total Expenses</p>
            <h2 className="text-2xl font-bold text-red-400 mt-2">
              {formatAmount(totalExpense)}
            </h2>
          </div>

        </div>

        {/* Add Transaction Form */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8">
          <h2 className="text-xl font-semibold mb-5">
            Add New Transaction
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Transaction Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter transaction title"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                min="0.01"
                step="0.01"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm mb-2 text-slate-300">
                  Transaction Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-cyan-400"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2 text-slate-300">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none focus:border-cyan-400"
                >
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Salary">Salary</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold py-3 rounded-lg transition"
            >
              Add Transaction
            </button>

          </form>
        </div>

        {/* Transaction History */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

          <h2 className="text-xl font-semibold mb-5">
            Transaction History
          </h2>

          {transactions.length === 0 ? (
            <p className="text-center text-slate-400 py-8">
              No transactions yet. Add your first transaction!
            </p>
          ) : (
            <div className="space-y-3">

              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-800 p-4 rounded-lg"
                >

                  <div>
                    <h3 className="font-semibold">
                      {transaction.title}
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">

                    <span
                      className={`font-bold ${
                        transaction.type === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatAmount(transaction.amount)}
                    </span>

                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Day10;
