function DashboardCard({ icon, bg, value, label, badge }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex-1">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${bg}`}
        >
          {icon}
        </div>
        <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
          {badge}
        </span>
      </div>
      <h2 className="text-3xl font-bold text-slate-800">{value}</h2>
      <p className="text-slate-400 text-sm mt-1">{label}</p>
    </div>
  );
}

export default DashboardCard;