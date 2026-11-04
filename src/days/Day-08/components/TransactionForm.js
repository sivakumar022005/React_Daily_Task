import { X } from "lucide-react";

function TransactionForm({
  showForm,
  onClose,
  onSubmit,
  formData,
  onFormChange,
  categories,
}) {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            Add Transaction
          </h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Transaction Name
            </label>
            <input
              type="text"
              placeholder="Enter transaction name"
              value={formData.title}
              onChange={(e) =>
                onFormChange({ ...formData, title: e.target.value })
              }
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(e) =>
                onFormChange({ ...formData, amount: e.target.value })
              }
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Transaction Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                onFormChange({ ...formData, type: e.target.value })
              }
              className="w-full border rounded-xl p-3 outline-none"
            >
              <option>Expense</option>
              <option>Income</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                onFormChange({ ...formData, category: e.target.value })
              }
              className="w-full border rounded-xl p-3 outline-none"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                onFormChange({ ...formData, date: e.target.value })
              }
              className="w-full border rounded-xl p-3 outline-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border rounded-xl py-3 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-medium"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
