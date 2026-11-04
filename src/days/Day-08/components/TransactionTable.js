import { Trash2 } from "lucide-react";

function TransactionTable({ transactions, onDelete, formatCurrency }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-500 text-sm border-b">
            <th className="p-3">Transaction</th>
            <th className="p-3">Category</th>
            <th className="p-3">Date</th>
            <th className="p-3">Type</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((item) => (
            <tr
              key={item.id}
              className="border-b last:border-0 hover:bg-slate-50"
            >
              <td className="p-3 font-medium">
                {item.title}
              </td>

              <td className="p-3 text-slate-500">
                {item.category}
              </td>

              <td className="p-3 text-slate-500">
                {item.date}
              </td>

              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.type === "Income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.type}
                </span>
              </td>

              <td
                className={`p-3 font-semibold ${
                  item.type === "Income"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {item.type === "Income" ? "+" : "-"}
                {formatCurrency(item.amount)}
              </td>

              <td className="p-3">
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                  title="Delete transaction"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}

          {transactions.length === 0 && (
            <tr>
              <td
                colSpan="6"
                className="text-center py-10 text-slate-400"
              >
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
