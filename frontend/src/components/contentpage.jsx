import React, { memo, useEffect, useState } from "react";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import AdminDashboard from "./AdminDashboard";

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
          <div className="text-center py-10">
            <h1 className="text-3xl font-bold mb-4">Welcome</h1>
            <p className="text-gray-600">Please log in to continue.</p>
          </div>
        );
    }
  };

  const renderContent = () => {
    // If it's the dashboard or profile page, show role-specific dashboard
    if (activePage === "Dashboard" || activePage === "Student Profile") {
      return renderDashboard();
    }

    // Handle other pages based on activePage prop
    switch (activePage) {
      case "Module":
        return <div>Module Content</div>;
      
      case "Scoreboard":
        return <div>Scoreboard Content</div>;
      
      case "Leaderboard":
        return <div>Leaderboard Content</div>;
      
      case "Posts":
        return <div>Posts Content</div>;
      
      case "Institution":
        return <div>Institution Management</div>;
      
      case "Add Admin":
        return <div>Add New Admin</div>;
      
      case "Management":
        return <div>System Management</div>;
      
      case "Add Institute":
        return <div>Add New Institute</div>;
      
      case "Add Module":
        return <div>Add New Module</div>;
      
      case "Quizes":
        return <div>Quiz Management</div>;
      
      case "Add Drill":
        return <div>Add New Drill</div>;
      
      case "Message":
        return <div>Messages</div>;

      default:
        return renderDashboard(); // Show dashboard as default view
    }
  };

  return (
    <main className="flex-1 p-8 bg-gray-50">
      {renderContent()}
    </main>
  );
});

// Add display name for debugging
Content.displayName = 'Content';

export default Content;