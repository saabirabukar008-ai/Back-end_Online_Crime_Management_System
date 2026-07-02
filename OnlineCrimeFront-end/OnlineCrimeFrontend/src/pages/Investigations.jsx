import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Modal from "../components/Modal";
import api from "../services/api";

function statusColor(status) {
  if (status === "Active") return "bg-green-100 text-green-600";
  if (status === "Pending") return "bg-yellow-100 text-yellow-600";
  return "bg-slate-200 text-slate-600";
}

function Investigations() {
  const [investigations, setInvestigations] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ officer: "", date: "", status: "Active", crimeId: "" });

  useEffect(() => {
    fetchInvestigations();
  }, []);

  async function fetchInvestigations() {
    try {
      setLoading(true);
      const res = await api.get("/InvestigationGet");
      setInvestigations(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Khalad ayaa dhacay marka xogta la soo qaadayay backend-ka.");
    } finally {
      setLoading(false);
    }
  }

  const filteredInvestigations = investigations.filter(
    (i) =>
      i.officerName?.toLowerCase().includes(search.toLowerCase()) ||
      String(i.investigationId).toLowerCase().includes(search.toLowerCase())
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function openAddModal() {
    setEditingId(null);
    setForm({ officer: "", date: "", status: "Active", crimeId: "" });
    setIsOpen(true);
  }

  function openEditModal(inv) {
    setEditingId(inv.investigationId);
    setForm({
      officer: inv.officerName,
      date: inv.investigationDate,
      status: inv.status,
      crimeId: inv.crimeId,
    });
    setIsOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.officer || !form.date || !form.crimeId) {
      alert("Fadlan buuxi dhammaan fields-ka loo baahan yahay");
      return;
    }

    try {
      if (editingId) {
        await api.put("/InvestigationUpdate", {
          investigationId: editingId,
          officerName: form.officer,
          investigationDate: form.date,
          status: form.status,
          crimeId: Number(form.crimeId),
        });
      } else {
        await api.post("/InvestigationInsert", {
          officerName: form.officer,
          investigationDate: form.date,
          status: form.status,
          crimeId: Number(form.crimeId),
        });
      }

      await fetchInvestigations();
      setForm({ officer: "", date: "", status: "Active", crimeId: "" });
      setEditingId(null);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert("Khalad: " + (err.response?.data || err.message));
    }
  }

  async function handleDelete(id) {
    if (!confirm("Ma hubtaa inaad rabto inaad tirtirto investigation-kan?")) return;
    try {
      await api.delete(`/InvestigationDelete/${id}`);
      await fetchInvestigations();
    } catch (err) {
      console.error(err);
      alert("Khalad: " + (err.response?.data || err.message));
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Investigations</h1>
          <p className="text-slate-400">Assign officers, track case progress, and close investigations.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl"
        >
          + Add Investigation
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by ID or officer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white border border-slate-200 rounded-full px-5 py-3 w-full my-5 outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && (
        <div className="bg-red-100 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="py-3 px-5">INV. ID</th>
              <th className="py-3 px-5">OFFICER NAME</th>
              <th className="py-3 px-5">DATE</th>
              <th className="py-3 px-5">STATUS</th>
              <th className="py-3 px-5">CRIME ID</th>
              <th className="py-3 px-5">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center py-6 text-slate-400">Loading...</td></tr>
            ) : filteredInvestigations.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-6 text-slate-400">No investigations found</td></tr>
            ) : (
              filteredInvestigations.map((i) => (
                <tr key={i.investigationId} className="border-t border-slate-100">
                  <td className="py-3 px-5 text-purple-600 font-semibold">{i.investigationId}</td>
                  <td className="py-3 px-5 font-semibold text-slate-800">{i.officerName}</td>
                  <td className="py-3 px-5 text-slate-500">{i.investigationDate}</td>
                  <td className="py-3 px-5">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(i.status)}`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-blue-600 font-semibold">{i.crimeId}</td>
                  <td className="py-3 px-5 flex gap-3">
                    <button onClick={() => openEditModal(i)} className="text-blue-500">✏️</button>
                    <button onClick={() => handleDelete(i.investigationId)} className="text-red-500">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingId ? "Edit Investigation" : "Add New Investigation"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Officer Name</label>
            <input type="text" name="officer" value={form.officer} onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Investigation Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Status</label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500">
              <option>Active</option>
              <option>Pending</option>
              <option>Closed</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Crime ID</label>
            <input type="number" name="crimeId" placeholder="e.g. 1" value={form.crimeId} onChange={handleChange}
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

export default Investigations;