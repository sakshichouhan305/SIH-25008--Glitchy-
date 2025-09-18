import React, { useEffect, useState } from "react";
import Sidebar from "../components/menubar";
import Content from "../components/contentpage";
import Access, { studentAccess, teacherAccess, adminAccess } from '../components/access';

export default function Admin() {
  const [active, setActive] = useState("Dashboard");
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [sidebarAccess, setSidebarAccess] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        
        setToken(storedToken);
        setRole(storedRole);

        switch(storedRole?.toLowerCase()) {
            case 'student':
                setSidebarAccess(studentAccess);
                break;
            case 'teacher':
                setSidebarAccess(teacherAccess);
                break;
            case 'admin':
                setSidebarAccess(adminAccess);
                break;
            default:
                setSidebarAccess([]);
        }
    }, []);

    if (!token) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <div className="bg-white rounded-xl shadow-lg p-10 max-w-md w-full text-center">
              <h2 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h2>
              <p className="text-gray-700 mb-6">Please login first to access the admin dashboard.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md">Login</button>
            </div>
          </div>
        );
    }

    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
        {/* Navbar */}
        <nav className="sticky top-0 w-full bg-white/90 backdrop-blur border-b border-gray-200 shadow-lg z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Brand */}
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 text-white px-3 py-2 rounded-lg font-bold text-lg shadow-md">
                  SE
                </div>
                <span className="text-2xl font-extrabold text-blue-700 tracking-wide">
                  SurakshaEd
                </span>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                  <a href="#faq" className="text-gray-600 hover:text-blue-500 font-semibold transition-colors px-2">
                    FAQ's
                  </a>
                  <a href="#emergency" className="text-gray-600 hover:text-blue-500 font-semibold transition-colors px-2">
                    Emergency
                  </a>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-blue-500 px-4 py-2 font-semibold transition-colors rounded-lg border border-gray-300 shadow-sm">
                  Login
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar + Content */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar adminAccess={sidebarAccess} setActive={setActive} />
          <div className="flex-1 overflow-y-auto">
            <Content activePage={active} />
          </div>
        </div>
      </div>
    );
}