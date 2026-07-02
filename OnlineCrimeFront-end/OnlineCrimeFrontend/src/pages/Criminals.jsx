import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Modal from "../components/Modal";
import api from "../services/api";

function genderColor(gender) {
  return gender === "Male" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600";
}

function Criminals() {
  const [criminals, setCriminals] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ fullname: "", age: "", gender: "Male", address: "", crimeId: "" });

  useEffect(() => {
    fetchCriminals();
  }, []);

  async function fetchCriminals() {
    try {
      setLoading(true);
      const res = await api.get("/CriminalGet");
      setCriminals(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Khalad ayaa dhacay marka xogta la soo qaadayay backend-ka.");
    } finally {
      setLoading(false);
    }
  }

  const filteredCriminals = criminals.filter(
    (c) =>
      c.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      String(c.criminalId).toLowerCase().includes(search.toLowerCase())
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function openAddModal() {
    setEditingId(null);
    setForm({ fullname: "", age: "", gender: "Male", address: "", crimeId: "" });
    setIsOpen(true);
  }

  function openEditModal(criminal) {
    setEditingId(criminal.criminalId);
    setForm({
      fullname: criminal.fullname,
      age: criminal.age,
      gender: criminal.gender,
      address: criminal.address,
      crimeId: criminal.crimeId,
    });
    setIsOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.fullname || !form.age || !form.address || !form.crimeId) {
      alert("Fadlan buuxi dhammaan fields-ka loo baahan yahay");
      return;
    }

    if (isNaN(form.age) || form.age <= 0) {
      alert("Age waa inuu noqdaa lambar sax ah");
      return;
    }

    try {
      if (editingId) {
        await api.put("/CriminalUpdate", {
          criminalId: editingId,
          fullname: form.fullname,
          age: Number(form.age),
          gender: form.gender,
          address: form.address,
          crimeId: Number(form.crimeId),
        });
      } else {
        await api.post("/CriminalInsert", {
          fullname: form.fullname,
          age: Number(form.age),
          gender: form.gender,
          address: form.address,
          crimeId: Number(form.crimeId),
        });
      }

      await fetchCriminals();
      setForm({ fullname: "", age: "", gender: "Male", address: "", crimeId: "" });
      setEditingId(null);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert("Khalad: " + (err.response?.data || err.message));
    }
  }

  async function handleDelete(id) {
    if (!confirm("Ma hubtaa inaad rabto inaad tirtirto criminal-kan?")) return;
    try {
      await api.delete(`/CriminalDelete/${id}`);
      await fetchCriminals();
    } catch (err) {
      console.error(err);
      alert("Khalad: " + (err.response?.data || err.message));
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Criminals Registry</h1>
          <p className="text-slate-400">Manage criminal profiles linked to reported crimes.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl"
        >
          + Add Criminal
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by ID or name..."
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
              <th className="py-3 px-5">CRIMINAL ID</th>
              <th className="py-3 px-5">FULL NAME</th>
              <th className="py-3 px-5">AGE</th>
              <th className="py-3 px-5">GENDER</th>
              <th className="py-3 px-5">ADDRESS</th>
              <th className="py-3 px-5">CRIME ID</th>
              <th className="py-3 px-5">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center py-6 text-slate-400">Loading...</td></tr>
            ) : filteredCriminals.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-6 text-slate-400">No criminals found</td></tr>
            ) : (
              filteredCriminals.map((c) => (
                <tr key={c.criminalId} className="border-t border-slate-100">
                  <td className="py-3 px-5 text-red-600 font-semibold">{c.criminalId}</td>
                  <td className="py-3 px-5 font-semibold text-slate-800">{c.fullname}</td>
                  <td className="py-3 px-5 text-slate-500">{c.age}</td>
                  <td className="py-3 px-5">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${genderColor(c.gender)}`}>
                      {c.gender}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-slate-500">{c.address}</td>
                  <td className="py-3 px-5 text-blue-600 font-semibold">{c.crimeId}</td>
                  <td className="py-3 px-5 flex gap-3">
                    <button onClick={() => openEditModal(c)} className="text-blue-500">✏️</button>
                    <button onClick={() => handleDelete(c.criminalId)} className="text-red-500">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingId ? "Edit Criminal" : "Add New Criminal"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input type="text" name="fullname" value={form.fullname} onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Age</label>
            <input type="number" name="age" value={form.age} onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500" />
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

export default Criminals;