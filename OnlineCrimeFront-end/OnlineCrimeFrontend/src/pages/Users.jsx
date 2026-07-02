import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Modal from "../components/Modal";
import api from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ fullname: "", username: "", role: "Officer", phone: "" });

  // Xogta ka soo qaad backend-ka marka page-ku furmo
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await api.get("/UserGet");
      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Khalad ayaa dhacay marka xogta la soo qaadayay backend-ka. Hubi inuu backend-ku socdo.");
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = users.filter(
    (u) =>
      u.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      String(u.userId).toLowerCase().includes(search.toLowerCase())
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function openAddModal() {
    setEditingId(null);
    setForm({ fullname: "", username: "", role: "Officer", phone: "" });
    setIsOpen(true);
  }

  function openEditModal(user) {
    setEditingId(user.userId);
    setForm({
      fullname: user.fullname,
      username: user.username,
      role: user.role,
      phone: user.phone,
    });
    setIsOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.fullname || !form.username || !form.phone) {
      alert("Fadlan buuxi dhammaan fields-ka loo baahan yahay");
      return;
    }

    try {
      if (editingId) {
        // UPDATE — PUT
        await api.put("/UserUpdate", {
          userId: editingId,
          fullname: form.fullname,
          username: form.username,
          role: form.role,
          phone: form.phone,
        });
      } else {
        // INSERT — POST
        await api.post("/UserInsert", {
          fullname: form.fullname,
          username: form.username,
          role: form.role,
          phone: form.phone,
        });
      }

      await fetchUsers(); // dib u soo qaad xogta cusub
      setForm({ fullname: "", username: "", role: "Officer", phone: "" });
      setEditingId(null);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert("Khalad ayaa dhacay marka la kaydinayay. Eeg console-ka faahfaahin.");
    }
  }
async function handleDelete(id) {
  console.log("========== DELETE START ==========");
  console.log("Deleting User ID:", id);

  if (!confirm("Ma hubtaa inaad rabto inaad tirtirto user-kan?")) return;

  try {
    const response = await api.delete(`/UserDelete/${id}`);

    console.log("Delete Success");
    console.log("Response:", response.data);

    await fetchUsers();
  } catch (err) {
    console.error("DELETE ERROR:", err);

    if (err.response) {
      console.log("Status Code:", err.response.status);
      console.log("Response Data:", err.response.data);
      console.log("Request URL:", err.config?.url);
    }

    alert("Khalad ayaa dhacay marka la tirtirayay.");
  }
}

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Users Management</h1>
          <p className="text-slate-400">Manage system users, roles, and access levels.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl"
        >
          + Add User
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
              <th className="py-3 px-5">USER ID</th>
              <th className="py-3 px-5">FULL NAME</th>
              <th className="py-3 px-5">USERNAME</th>
              <th className="py-3 px-5">ROLE</th>
              <th className="py-3 px-5">PHONE</th>
              <th className="py-3 px-5">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-slate-400">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-slate-400">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.userId} className="border-t border-slate-100">
                  <td className="py-3 px-5 text-blue-600 font-semibold">{u.userId}</td>
                  <td className="py-3 px-5 font-semibold text-slate-800">{u.fullname}</td>
                  <td className="py-3 px-5 text-slate-500">{u.username}</td>
                  <td className="py-3 px-5">
                    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-slate-500">{u.phone}</td>
                  <td className="py-3 px-5 flex gap-3">
                    <button onClick={() => openEditModal(u)} className="text-blue-500">✏️</button>
                    <button onClick={() => handleDelete(u.userId)} className="text-red-500">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editingId ? "Edit User" : "Add New User"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Admin</option>
              <option>Officer</option>
              <option>Investigator</option>
              <option>Analyst</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 border border-slate-200 rounded-xl py-3 font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold"
            >
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

export default Users;