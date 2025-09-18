import React, { memo, useEffect, useState } from "react";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import AdminDashboard from "./AdminDashboard";
import Post from "./post";

const Content = memo(({ activePage }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role?.toLowerCase());
  }, []);

  const renderDashboard = () => {
    switch (userRole) {
      case "student":
        return <StudentDashboard />;
      case "teacher":
        return <TeacherDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
              <h1 className="text-4xl font-extrabold mb-4 text-blue-600 text-center">Welcome!</h1>
              <p className="text-gray-600 text-center mb-2">Please log in to continue and access your dashboard.</p>
              <div className="flex justify-center mt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md">Login</button>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderContent = () => {
    // If it's the dashboard or profile page, show role-specific dashboard
    if (activePage === "Dashboard" || activePage === "Student Profile") {
      return renderDashboard();
    }

    // Card style for content
    const cardClass = "bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto mt-10 text-center animate-fade-in";

    // Handle other pages based on activePage prop
    switch (activePage) {
      case "Module":
        return <div className={cardClass}><h2 className="text-2xl font-bold mb-2 text-blue-600">Module</h2><p className="text-gray-700">Explore learning modules tailored for you.</p></div>;
      case "Scoreboard":
        return <div className={cardClass}><h2 className="text-2xl font-bold mb-2 text-green-600">Scoreboard</h2><p className="text-gray-700">Track your progress and scores here.</p></div>;
      case "Leaderboard":
        return <div className={cardClass}><h2 className="text-2xl font-bold mb-2 text-yellow-600">Leaderboard</h2><p className="text-gray-700">See top performers and rankings.</p></div>;
      case "Posts":
        return <Post />;
      case "Institution":
        return <div className={cardClass}><h2 className="text-2xl font-bold mb-2 text-blue-800">Institution Management</h2><p className="text-gray-700">Manage institutions and their details.</p></div>;
      case "Add Admin":
        return <div className={cardClass}><h2 className="text-2xl font-bold mb-2 text-pink-600">Add New Admin</h2><p className="text-gray-700">Add a new admin to the system.</p></div>;
      case "Management":
        return <div className={cardClass}><h2 className="text-2xl font-bold mb-2 text-gray-800">System Management</h2><p className="text-gray-700">Configure and manage system settings.</p></div>;
      case "Add Institute":
        return <div className={cardClass}><h2 className="text-2xl font-bold mb-2 text-indigo-600">Add New Institute</h2><p className="text-gray-700">Register a new institute.</p></div>;
      case "Add Module":
        return <div className={cardClass}><h2 className="text-2xl font-bold mb-2 text-blue-500">Add New Module</h2><p className="text-gray-700">Create a new learning module.</p></div>;
      case "Quizes":
        return <div className={cardClass}><h2 className="text-2xl font-bold mb-2 text-red-600">Quiz Management</h2><p className="text-gray-700">Manage quizzes and assessments.</p></div>;
      case "Add Drill":
        return <div className={cardClass}><h2 className="text-2xl font-bold mb-2 text-teal-600">Add New Drill</h2><p className="text-gray-700">Add drills for practice.</p></div>;
      case "Message":
        return <div className={cardClass}><h2 className="text-2xl font-bold mb-2 text-blue-400">Messages</h2><p className="text-gray-700">View and send messages.</p></div>;
      default:
        return renderDashboard(); // Show dashboard as default view
    }
  };

  return (
    <main className="flex-1 p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      {renderContent()}
    </main>
  );
});

// Add display name for debugging
Content.displayName = 'Content';

export default Content;