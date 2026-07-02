function About() {
  return (
    <div className="bg-slate-50 min-h-screen px-10 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          About Us
        </h1>
        <p className="text-slate-500 mb-10">
          Learn more about the Online Crime Management System and how to reach our team.
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-3">Our Mission</h2>
          <p className="text-slate-500">
            We aim to modernize crime reporting and investigation tracking by
            providing law enforcement agencies with a secure, centralized,
            and easy-to-use digital platform — reducing paperwork and
            improving response times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <p className="font-bold text-slate-800">📍 Address</p>
            <p className="text-slate-500 text-sm mt-1">Mogadishu, Somalia</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <p className="font-bold text-slate-800">📞 Phone</p>
            <p className="text-slate-500 text-sm mt-1">+252 61 000 0000</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <p className="font-bold text-slate-800">✉️ Email</p>
            <p className="text-slate-500 text-sm mt-1">support@crimemanager.com</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Your Name</label>
              <input
                type="text"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Your Email</label>
              <input
                type="email"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Message</label>
              <textarea
                rows="4"
                className="w-full border border-slate-200 rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default About;