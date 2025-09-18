import React from "react";


const icons = {
  Dashboard: "📊",
  "Student Profile": "👤",
  Module: "📚",
  Scoreboard: "🏆",
  Leaderboard: "🥇",
  Posts: "📝",
  Institution: "🏫",
  "Add Admin": "➕",
  Management: "⚙️",
  "Add Institute": "🏢",
  "Add Module": "➕",
  Quizes: "❓",
  "Add Drill": "🛠️",
  Message: "💬"
};

export default function Sidebar({ adminAccess, setActive }) {
  return (
    <aside className="w-72 bg-gradient-to-b from-blue-50 to-blue-100 border-r shadow-xl p-6 min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-blue-700 tracking-wide flex items-center gap-2">
        <span className=" text-black px-2 py-1 rounded-lg">Menu</span>
      </h2>
      <ul className="space-y-3 text-gray-800 font-medium flex-1">
        {adminAccess.map((value, key) => (
          <li
            onClick={() => setActive(value?.name)}
            key={key}
            className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-500 hover:text-white shadow-sm group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform duration-200">
              {icons[value?.name] || "🔹"}
            </span>
            <span className="text-base font-semibold">{value?.name}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-center text-xs text-gray-400">© 2025 SurakshaEd</div>
    </aside>
  );
}