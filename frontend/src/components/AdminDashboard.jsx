import React from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
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
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  // User statistics data
  const userStatsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 89, 80, 81, 56, 95],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  // Institute distribution data
  const instituteData = {
    labels: ['Schools', 'Colleges', 'Universities', 'Training Centers'],
    datasets: [
      {
        data: [30, 25, 15, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Module usage data
  const moduleData = {
    labels: ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5'],
    datasets: [
      {
        label: 'Active Users',
        data: [320, 280, 250, 200, 180],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-700">Total Users</h4>
          <p className="text-2xl font-bold text-blue-800">2,543</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-green-700">Active Institutes</h4>
          <p className="text-2xl font-bold text-green-800">80</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-purple-700">Total Modules</h4>
          <p className="text-2xl font-bold text-purple-800">15</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-yellow-700">Active Sessions</h4>
          <p className="text-2xl font-bold text-yellow-800">156</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">User Growth</h3>
          <Line
            data={userStatsData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Monthly User Growth'
                }
              }
            }}
          />
        </div>

        {/* Institute Distribution */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Institute Distribution</h3>
          <Doughnut
            data={instituteData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: true,
                  text: 'Types of Institutes'
                }
              }
            }}
          />
        </div>

        {/* Module Usage */}
        <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Module Usage</h3>
          <Bar
            data={moduleData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Active Users per Module'
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;