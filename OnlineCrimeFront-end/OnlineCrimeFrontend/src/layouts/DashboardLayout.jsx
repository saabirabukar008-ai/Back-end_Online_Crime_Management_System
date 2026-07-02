import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 bg-slate-50 min-h-screen">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;