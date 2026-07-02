import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col justify-between fixed left-0 top-0">
      <div>
        <div className="flex items-center gap-2 px-5 py-6">
          <div className="bg-blue-600 w-9 h-9 rounded-full flex items-center justify-center">
            🛡️
          </div>
          <span className="text-white font-bold tracking-wide">
            CRIME MANAGER
          </span>
        </div>

        <nav className="px-3 mt-4">
          <NavLink to="/dashboard" className={linkClass}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/users" className={linkClass}>
            👤 Users
          </NavLink>
          <NavLink to="/crime-reports" className={linkClass}>
            📄 Crime Reports
          </NavLink>
          <NavLink to="/criminals" className={linkClass}>
            ⚠️ Criminals
          </NavLink>
          <NavLink to="/investigations" className={linkClass}>
            🔍 Investigations
          </NavLink>
        </nav>
      </div>

    

      <div className="px-3 pb-6">
        <NavLink to="/" className={linkClass}>
          🚪 Logout
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;