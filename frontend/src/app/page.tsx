export const runtime = "edge";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-cyan-100 py-12 px-4">
      {/* Hero & Features */}
      <div className="flex flex-col items-center max-w-2xl w-full bg-white/90 rounded-3xl shadow-2xl p-10 mb-12">
        <div className="mb-8 flex flex-col items-center">
          <div className="bg-blue-500 rounded-full p-4 mb-3 shadow-xl">
            {/* SVG logo unchanged */}
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="28" cy="28" r="28" fill="#3B82F6" />
              <path
                d="M18 36c0-4.418 7.163-8 16-8s16 3.582 16 8v2c0 1.105-.895 2-2 2H20c-1.105 0-2-.895-2-2v-2z"
                fill="#fff"
              />
              <ellipse cx="28" cy="24" rx="8" ry="10" fill="#fff" />
              <ellipse cx="24" cy="24" rx="2" ry="3" fill="#3B82F6" />
              <ellipse cx="32" cy="24" rx="2" ry="3" fill="#3B82F6" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight mb-2 text-center drop-shadow-sm">
            RecallShield
          </h1>
          <p className="text-blue-900 text-xl text-center font-medium">
            HIPAA-Compliant Dental Recall Agent
          </p>
        </div>
        <p className="text-gray-700 text-center mb-8 text-lg">
          Reduce no-shows, automate patient follow-ups, and ensure compliance with
          <span className="font-semibold text-blue-600"> RecallShield</span>—the AI-powered dental recall solution trusted by modern practices.
        </p>
        <a
          href="#"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-xl shadow-lg transition mb-4 text-lg"
        >
          Request a Demo
        </a>
        <section className="mt-10 w-full">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Why Choose RecallShield?
          </h2>
          <ul className="grid gap-5">
            <li className="flex items-start gap-4">
              <span className="text-blue-500 text-3xl">🦷</span>
              <span className="text-gray-800 text-lg">
                Automated, friendly appointment reminders for every patient
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-blue-500 text-3xl">🔒</span>
              <span className="text-gray-800 text-lg">
                HIPAA-compliant messaging and data handling
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-blue-500 text-3xl">⚡</span>
              <span className="text-gray-800 text-lg">
                Quick, seamless integration with your existing systems
              </span>
            </li>
          </ul>
        </section>
      </div>

      {/* Testimonials Section */}
      <section className="w-full max-w-3xl mt-4 bg-white/90 rounded-3xl shadow-xl p-10 mb-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-2xl p-6 shadow flex flex-col items-center">
            <p className="text-gray-700 italic mb-3 text-lg">“RecallShield has cut our no-shows in half. Our patients love the reminders!”</p>
            <span className="font-semibold text-blue-700">— Dr. Smith, Family Dental</span>
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 shadow flex flex-col items-center">
            <p className="text-gray-700 italic mb-3 text-lg">“Setup was a breeze and the support team is fantastic. Highly recommend!”</p>
            <span className="font-semibold text-blue-700">— Dr. Lee, Smile Studio</span>
          </div>
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="w-full max-w-xl mt-4 flex flex-col items-center bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl shadow-xl p-10 mb-12">
        <h2 className="text-3xl font-bold text-white mb-3 text-center drop-shadow">
          Ready to Modernize Your Practice?
        </h2>
        <p className="text-white text-center mb-6 text-lg font-medium">
          Join leading dental offices using RecallShield to boost patient engagement and retention.
        </p>
        <a
          href="#"
          className="inline-block bg-white hover:bg-blue-100 text-blue-700 font-semibold py-3 px-10 rounded-xl shadow-lg transition text-lg"
        >
          Get Started
        </a>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-3xl mt-4 mb-2 text-center text-gray-500 text-base">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <span>&copy; {new Date().getFullYear()} RecallShield. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-700">Contact</a>
            <a href="#" className="hover:text-blue-700">Privacy Policy</a>
            <a href="#" className="hover:text-blue-700">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
