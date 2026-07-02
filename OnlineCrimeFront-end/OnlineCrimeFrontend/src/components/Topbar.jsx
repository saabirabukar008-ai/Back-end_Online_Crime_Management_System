function Topbar() {
  return (
    <header className="bg-white h-16 flex items-center justify-between px-6 border-b border-slate-200">
      <input
        type="text"
        placeholder="Search anything..."
        className="bg-slate-100 rounded-full px-4 py-2 w-72 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex items-center gap-4">
        <span className="text-slate-500 cursor-pointer">🔔</span>
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold">
            SA
          </div>
          <div className="text-sm">
            <p className="font-bold text-slate-800">Sabir Abukar</p>
            <p className="text-slate-400 text-xs">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;