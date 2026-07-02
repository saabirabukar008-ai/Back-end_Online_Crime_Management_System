import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.username || !form.password) {
      setError("Fadlan buuxi username iyo password labadaba.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/Login", {
        username: form.username,
        password: form.password,
      });

      // Login guuleystay — user-ka kaydi (localStorage) si Sidebar/pages kale u ogaadaan
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError("Username ama Password khaldan. Fadlan isku day mar kale.");
      } else {
        setError("Khalad ayaa dhacay. Hubi in backend-ku socdo.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mb-3">
            🛡️
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Crime Manager</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. amina"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl mt-2 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          <a href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;