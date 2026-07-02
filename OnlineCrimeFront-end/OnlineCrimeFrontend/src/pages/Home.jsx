import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 w-9 h-9 rounded-full flex items-center justify-center text-white">
            🛡️
          </div>
          <span className="font-bold text-slate-800 tracking-wide">
            CRIME MANAGER
          </span>
        </div>

        <div className="hidden md:flex gap-8 text-slate-600 font-medium">
          <a href="#about" className="hover:text-blue-600">
            About
          </a>
          <a href="#services" className="hover:text-blue-600">
            Services
          </a>
          <a href="#stats" className="hover:text-blue-600">
            Statistics
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>
        </div>

        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl"
        >
          Login
        </Link>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <span className="bg-blue-600/20 text-blue-400 text-xs font-semibold px-4 py-1 rounded-full mb-5">
          Online Crime Management System
        </span>

        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
          Smarter Crime Reporting & Investigation Management
        </h1>

        <p className="text-slate-300 max-w-xl mt-5">
          A centralized platform for officers and administrators to record,
          track, and resolve crime reports efficiently and securely.
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          >
            Get Started
          </Link>

          <a
            href="#about"
            className="border border-slate-500 hover:border-white px-6 py-3 rounded-xl font-semibold"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="px-10 py-20 max-w-5xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          About the System
        </h2>

        <p className="text-slate-500 max-w-2xl mx-auto">
          The Online Crime Management System helps law enforcement teams
          digitize case records, manage criminal profiles, and coordinate
          investigations from a single, secure dashboard — replacing slow,
          paper-based processes with real-time data access.
        </p>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-white px-10 py-20">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">
          What We Offer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: "📄",
              title: "Crime Reporting",
              desc: "Log and track crime reports with full detail and status updates.",
            },
            {
              icon: "⚠️",
              title: "Criminal Records",
              desc: "Maintain a secure registry of criminal profiles linked to cases.",
            },
            {
              icon: "🔍",
              title: "Investigations",
              desc: "Assign officers and monitor investigation progress in real time.",
            },
            {
              icon: "👤",
              title: "User Management",
              desc: "Control access with role-based accounts for staff and officers.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-6 text-center shadow-sm"
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="font-bold text-slate-800 mb-2">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATISTICS */}
      <section id="stats" className="px-10 py-20 bg-slate-900 text-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          System at a Glance
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
          {[
            { value: "489", label: "Total Users" },
            { value: "3,842", label: "Crime Reports" },
            { value: "1,296", label: "Criminals" },
            { value: "2,157", label: "Investigations" },
          ].map((stat, index) => (
            <div key={index}>
              <h3 className="text-4xl font-bold text-blue-400">
                {stat.value}
              </h3>
              <p className="text-slate-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="px-10 py-20 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Contact Us
        </h2>

        <p className="text-slate-500 mb-8">
          Have questions about access or need support? Reach out to our team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="font-bold text-slate-800">📍 Address</p>
            <p className="text-slate-500 text-sm mt-1">Mogadishu, Somalia</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="font-bold text-slate-800">📞 Phone</p>
            <p className="text-slate-500 text-sm mt-1">
              +252 61 88 80 08
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="font-bold text-slate-800">✉️ Email</p>
            <p className="text-slate-500 text-sm mt-1">
              Crimemanager@gmail.com
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-center py-6 text-sm">
        © 2026 Online Crime Management System — Built by Sabir Abukar
      </footer>
    </div>
  );
}

export default Home;