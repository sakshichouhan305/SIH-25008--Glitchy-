import React from "react";
import { Bar } from 'react-chartjs-2';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Example leaderboard data
const students = [
  {
    id: 1,
    name: "Aman Kumar",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    score: 95,
    progress: [80, 85, 90, 95],
    modules: 18,
    rank: 1
  },
  {
    id: 2,
    name: "Priya Singh",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    score: 92,
    progress: [70, 80, 85, 92],
    modules: 17,
    rank: 2
  },
  {
    id: 3,
    name: "Rahul Verma",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    score: 89,
    progress: [60, 75, 80, 89],
    modules: 16,
    rank: 3
  }
];

export default function StudentLeaderboard() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-indigo-700 text-center">Student Leaderboard</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {students.map(student => (
          <div key={student.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow">
            <img src={student.avatar} alt={student.name} className="w-20 h-20 rounded-full border-4 border-indigo-300 shadow mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
            <p className="text-sm text-gray-600 mb-2">Rank: <span className="font-semibold text-indigo-600">#{student.rank}</span></p>
            <p className="text-sm text-gray-600 mb-2">Score: <span className="font-semibold text-green-600">{student.score}%</span></p>
            <p className="text-sm text-gray-600 mb-2">Modules Completed: <span className="font-semibold">{student.modules}</span></p>
            <div className="w-full mt-4">
              <Bar
                data={{
                  labels: ["Q1", "Q2", "Q3", "Q4"],
                  datasets: [
                    {
                      label: "Progress (%)",
                      data: student.progress,
                      backgroundColor: "rgba(99, 102, 241, 0.7)",
                      borderRadius: 8,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: { display: false }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      ticks: { color: '#6366f1', font: { size: 12, weight: 'bold' } },
                      grid: { color: '#e0e7ff' }
                    },
                    x: {
                      ticks: { color: '#6366f1', font: { size: 12, weight: 'bold' } },
                      grid: { display: false }
                    }
                  }
                }}
                height={120}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}