import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StudentDashboard = () => {
  // Sample data for histogram
  const histogramData = {
    labels: ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5'],
    datasets: [
      {
        label: 'Score',
        data: [85, 72, 90, 65, 88],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Sample data for pie chart
  const pieData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [12, 5, 3],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Performance Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Histogram */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Module Performance</h3>
          <Bar
            data={histogramData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Score Distribution by Module'
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  title: {
                    display: true,
                    text: 'Score (%)'
                  }
                }
              }
            }}
          />
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Module Completion Status</h3>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: true,
                  text: 'Module Progress'
                }
              }
            }}
          />
        </div>

        {/* Summary Stats */}
        <div className="md:col-span-2 grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <h4 className="text-sm font-semibold text-blue-700">Average Score</h4>
            <p className="text-2xl font-bold text-blue-800">80%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <h4 className="text-sm font-semibold text-green-700">Modules Completed</h4>
            <p className="text-2xl font-bold text-green-800">12/20</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <h4 className="text-sm font-semibold text-purple-700">Total Time Spent</h4>
            <p className="text-2xl font-bold text-purple-800">45h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;