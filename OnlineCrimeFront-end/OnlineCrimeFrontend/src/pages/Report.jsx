import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function statusColor(status) {
  if (status === "Solved") return "bg-green-100 text-green-600";
  if (status === "Pending") return "bg-yellow-100 text-yellow-600";
  return "bg-blue-100 text-blue-600";
}

function Report() {
  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);
        const res = await api.get("/CrimeGet");
        setAllReports(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Khalad ayaa dhacay marka xogta la soo qaadayay.");
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const filtered = allReports.filter((r) => {
    const statusMatch = statusFilter === "All" || r.status === statusFilter;
    const fromMatch = !fromDate || r.crimeDate >= fromDate;
    const toMatch = !toDate || r.crimeDate <= toDate;
    return statusMatch && fromMatch && toMatch;
  });

  const solvedCount = filtered.filter((r) => r.status === "Solved").length;
  const pendingCount = filtered.filter((r) => r.status === "Pending").length;
  const investigatingCount = filtered.filter((r) => r.status === "Under Investigation").length;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-slate-800 mb-1">Reports</h1>
      <p className="text-slate-400 mb-6">Filter and review crime report summaries.</p>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-wrap gap-4 items-end mb-6">
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Under Investigation</option>
            <option>Solved</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-1">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-1">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => { setStatusFilter("All"); setFromDate(""); setToDate(""); }}
          className="border border-slate-200 text-slate-600 font-semibold px-5 py-2 rounded-lg hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl shadow-sm p-5 text-center">
          <h3 className="text-2xl font-bold text-green-600">{solvedCount}</h3>
          <p className="text-slate-400 text-sm mt-1">Solved</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 text-center">
          <h3 className="text-2xl font-bold text-yellow-600">{pendingCount}</h3>
          <p className="text-slate-400 text-sm mt-1">Pending</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 text-center">
          <h3 className="text-2xl font-bold text-blue-600">{investigatingCount}</h3>
          <p className="text-slate-400 text-sm mt-1">Under Investigation</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="py-3 px-5">CRIME ID</th>
              <th className="py-3 px-5">TITLE</th>
              <th className="py-3 px-5">DATE</th>
              <th className="py-3 px-5">LOCATION</th>
              <th className="py-3 px-5">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-slate-400">Loading...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-slate-400">
                  No reports match the selected filters
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.crimeId} className="border-t border-slate-100">
                  <td className="py-3 px-5 text-blue-600 font-semibold">{r.crimeId}</td>
                  <td className="py-3 px-5 font-semibold text-slate-800">{r.title}</td>
                  <td className="py-3 px-5 text-slate-500">{r.crimeDate}</td>
                  <td className="py-3 px-5 text-slate-500">{r.location}</td>
                  <td className="py-3 px-5">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Report;