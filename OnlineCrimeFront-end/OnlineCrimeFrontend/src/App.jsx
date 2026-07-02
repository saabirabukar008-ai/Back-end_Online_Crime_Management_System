import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import CrimeReports from "./pages/CrimeReports";
import Criminals from "./pages/Criminals";
import Investigations from "./pages/Investigations";
import Report from "./pages/Report";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/crime-reports" element={<CrimeReports />} />
      <Route path="/criminals" element={<Criminals />} />
      <Route path="/investigations" element={<Investigations />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
}

export default App;