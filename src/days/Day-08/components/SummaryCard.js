function SummaryCard({ title, amount, icon: Icon, iconColor, amountColor, subtitle }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <p className="text-slate-500 text-sm">{title}</p>
        <Icon className={iconColor} />
      </div>
      <h2 className={`text-2xl font-bold mt-4 ${amountColor}`}>
        {amount}
      </h2>
      <p className="text-xs text-slate-400 mt-2">
        {subtitle}
      </p>
    </div>
  );
}

export default SummaryCard;
