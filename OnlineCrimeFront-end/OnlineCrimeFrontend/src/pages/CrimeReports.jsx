import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Modal from "../components/Modal";
import api from "../services/api";

function statusColor(status) {
  if (status === "Solved") return "bg-green-100 text-green-600";
  if (status === "Pending") return "bg-yellow-100 text-yellow-600";
  return "bg-blue-100 text-blue-600";
}

function CrimeReports() {
  const [crimes, setCrimes] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", date: "", location: "", status: "Pending", userId: "" });

  useEffect(() => { fetchCrimes(); }, []);

  async function fetchCrimes() {
    try {
      setLoading(true);
      const res = await api.get("/CrimeGet");
      setCrimes(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Khalad ayaa dhacay marka xogta la soo qaadayay backend-ka.");
    } finally {
      setLoading(false);
    }
  }

  const filteredCrimes = crimes.filter(
    (c) =>
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      String(c.crimeId).includes(search)
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function openAddModal() {
    setEditingId(null);
    setForm({ title: "", date: "", location: "", status: "Pending", userId: "" });
    setIsOpen(true);
  }

  function openEditModal(crime) {
    setEditingId(crime.crimeId);
    setForm({
      title: crime.title,
      date: crime.crimeDate,
      location: crime.location,
      status: crime.status,
      userId: crime.userId,
    });
    setIsOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.date || !form.location || !form.userId) {
      alert("Fadlan buuxi dhammaan fields-ka loo baahan yahay");
      return;
    }
    try {
      if (editingId) {
        await api.put("/CrimeUpdate", {
          crimeId: editingId,
          title: form.title,
          crimeDate: form.date,
          location: form.location,
          status: form.status,
          userId: Number(form.userId),
        });
      } else {
        await api.post("/CrimeInsert", {
          title: form.title,
          crimeDate: form.date,
          location: form.location,
          status: form.status,
          userId: Number(form.userId),
        });
      }
      await fetchCrimes();
      setForm({ title: "", date: "", location: "", status: "Pending", userId: "" });
      setEditingId(null);
      setIsOpen(false);
    } catch (err) {
      alert("Khalad: " + (err.response?.data || err.message));
    }
  }

  async function handleDelete(id) {
    if (!confirm("Ma hubtaa inaad rabto inaad tirtirto?")) return;
    try {
      await api.delete(`/CrimeDelete/${id}`);
      await fetchCrimes();
    } catch (err) {
      alert("Khalad: " + (err.response?.data || err.message));
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Crime Reports</h1>
          <p className="text-slate-400">Track, manage, and update all crime reports.</p>
        </div>
        <button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl">
          + Add Report
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by ID or title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white border border-slate-200 rounded-full px-5 py-3 w-full my-5 outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <div className="bg-red-100 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl mb-4">{error}</div>}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="py-3 px-5">CRIME ID</th>
              <th className="py-3 px-5">TITLE</th>
              <th className="py-3 px-5">DATE</th>
              <th className="py-3 px-5">LOCATION</th>
              <th className="py-3 px-5">STATUS</th>
              <th className="py-3 px-5">USER ID</th>
              <th className="py-3 px-5">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center py-6 text-slate-400">Loading...</td></tr>
            ) : filteredCrimes.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-6 text-slate-400">No crime reports found</td></tr>
            ) : (
              filteredCrimes.map((c) => (
                <tr key={c.crimeId} className="border-t border-slate-100">
                  <td className="py-3 px-5 text-blue-600 font-semibold">{c.crimeId}</td>
                  <td className="py-3 px-5 font-semibold text-slate-800">{c.title}</td>
                  <td className="py-3 px-5 text-slate-500">{c.crimeDate}</td>
                  <td className="py-3 px-5 text-slate-500">{c.location}</td>
                  <td className="py-3 px-5">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-slate-500">{c.userId}</td>
                  <td className="py-3 px-5 flex gap-3">
                    <button onClick={() => openEditModal(c)} className="text-blue-500">✏️</button>
                    <button onClick={() => handleDelete(c.crimeId)} className="text-red-500">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingId ? "Edit Crime Report" : "Add New Crime Report"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Location</label>
            <input type="text" name="location" value={form.location} onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Status</label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500">
              <option>Pending</option>
              <option>Under Investigation</option>
              <option>Solved</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">User ID (Officer)</label>
            <input type="number" name="userId" value={form.userId} onChange={handleChange}
              placeholder="e.g. 1"
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setIsOpen(false)}
              className="flex-1 border border-slate-200 rounded-xl py-3 font-semibold text-slate-600">Cancel</button>
            <button type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold">
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

export default CrimeReports;