import Image from "next/image";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
      <div className="flex flex-col items-center max-w-xl w-full bg-white/80 rounded-2xl shadow-xl p-8 border border-blue-100">
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-blue-500 rounded-full p-3 mb-2 shadow-lg">
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
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight mb-1 text-center">
            RecallShield
          </h1>
          <p className="text-blue-900 text-lg text-center">
            HIPAA-Compliant Dental Recall Agent
          </p>
        </div>
        <p className="text-gray-700 text-center mb-6">
          Reduce no-shows, automate patient follow-ups, and ensure compliance with
          RecallShield—the AI-powered dental recall solution trusted by modern
          practices.
        </p>
        <a
          href="#"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition mb-2"
        >
          Request a Demo
        </a>
        <section className="mt-8 w-full">
          <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
            Why Choose RecallShield?
          </h2>
          <ul className="grid gap-4">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 text-2xl">🦷</span>
              <span className="text-gray-800">
                Automated, friendly appointment reminders for every patient
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 text-2xl">🔒</span>
              <span className="text-gray-800">
                HIPAA-compliant messaging and data handling
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 text-2xl">📈</span>
              <span className="text-gray-800">
                Reduce no-shows and increase practice revenue
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 text-2xl">🤖</span>
              <span className="text-gray-800">
                AI-powered scheduling and recall workflows
              </span>
            </li>
          </ul>
        </section>
        <p className="text-xs text-gray-400 text-center mt-8">
          &copy; {new Date().getFullYear()} RecallShield. All rights reserved.
        </p>
      </div>
    </main>
  );
}
