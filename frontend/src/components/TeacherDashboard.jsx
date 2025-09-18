import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
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

const TeacherDashboard = () => {
  // Class performance data
  const performanceData = {
    labels: ['Class A', 'Class B', 'Class C', 'Class D'],
    datasets: [
      {
        label: 'Average Score',
        data: [85, 72, 90, 78],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  // Student progress data
  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [20, 35, 45, 60],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  // Student status data
  const statusData = {
    labels: ['Active', 'Inactive', 'Completed'],
    datasets: [
      {
        data: [45, 15, 20],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Teacher Dashboard</h2>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-700">Total Students</h4>
          <p className="text-2xl font-bold text-blue-800">80</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-green-700">Average Score</h4>
          <p className="text-2xl font-bold text-green-800">76%</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-purple-700">Active Modules</h4>
          <p className="text-2xl font-bold text-purple-800">5</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-yellow-700">Completion Rate</h4>
          <p className="text-2xl font-bold text-yellow-800">65%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Class Performance */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Class Performance</h3>
          <Bar
            data={performanceData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Average Scores by Class'
                }
              }
            }}
          />
        </div>

        {/* Student Progress */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Student Progress</h3>
          <Line
            data={progressData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Weekly Progress'
                }
              }
            }}
          />
        </div>

        {/* Student Status */}
        <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Student Status</h3>
          <div className="w-1/2 mx-auto">
            <Pie
              data={statusData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                  title: {
                    display: true,
                    text: 'Student Status Distribution'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;