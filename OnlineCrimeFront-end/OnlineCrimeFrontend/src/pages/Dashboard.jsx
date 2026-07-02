import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

const barData = [
  { month: "Jan", reports: 32 },
  { month: "Feb", reports: 35 },
  { month: "Mar", reports: 42 },
  { month: "Apr", reports: 30 },
  { month: "May", reports: 50 },
  { month: "Jun", reports: 36 },
];

const pieData = [
  { name: "Solved", value: 40, color: "#22c55e" },
  { name: "Pending", value: 30, color: "#f59e0b" },
  { name: "Under Inv.", value: 30, color: "#3b82f6" },
];

function Dashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    crimes: 0,
    criminals: 0,
    investigations: 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [u, c, cr, inv] = await Promise.all([
          api.get("/UserGet"),
          api.get("/CrimeGet"),
          api.get("/CriminalGet"),
          api.get("/InvestigationGet"),
        ]);
        setCounts({
          users: u.data.length,
          crimes: c.data.length,
          criminals: cr.data.length,
          investigations: inv.data.length,
        });
      } catch (err) {
        console.error("Dashboard count error:", err);
      }
    }
    fetchCounts();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
      <p className="text-slate-400 mb-6">Welcome back, Sabir. Here is what is happening today.</p>

      <div className="flex gap-5 mb-6">
        <DashboardCard icon="👤" bg="bg-blue-600" value={counts.users} label="Total Users" badge="Live" />
        <DashboardCard icon="📄" bg="bg-purple-600" value={counts.crimes} label="Crime Reports" badge="Live" />
        <DashboardCard icon="⚠️" bg="bg-purple-500" value={counts.criminals} label="Criminals" badge="Live" />
        <DashboardCard icon="🔍" bg="bg-cyan-500" value={counts.investigations} label="Investigations" badge="Live" />
      </div>

      <div className="flex gap-5">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex-[2]">
          <h3 className="font-bold text-slate-800 mb-4">Crime Reports Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reports" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 flex-1">
          <h3 className="font-bold text-slate-800 mb-4">Case Status</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={3}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;