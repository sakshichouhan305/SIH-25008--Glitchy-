import React, { useEffect, useState } from "react";
import Sidebar from "../components/menubar";
import Content from "../components/contentpage";
import Access, { studentAccess, teacherAccess, adminAccess } from '../components/access';

export default function Admin() {
    const [active, setActive] = useState(null);
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
        return <div>Access Denied. Please login first.</div>;
    }

    // Find the active component
    const activeComponent = sidebarAccess.find(item => item.name === active)?.component;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
          {/* ✅ Navbar (same as Home.jsx) */}
          <nav className="sticky top-0 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Brand */}
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 text-white px-3 py-2 rounded-lg font-bold text-lg">
                    SE
                  </div>
                  <span className="text-xl font-semibold text-gray-900">
                    SurakshaEd
                  </span>
                </div>
    
                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                  <a
                    href="#features"
                    className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#students"
                    className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
                  >
                    Students
                  </a>
                  <a
                    href="#teachers"
                    className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
                  >
                    Teachers
                  </a>
                  <a
                    href="#admin"
                    className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
                  >
                    Admin
                  </a>
                </div>
    
                {/* Auth Buttons */}
                <div className="flex items-center space-x-4">
                  <button className="text-gray-600 hover:text-blue-500 px-4 py-2 font-medium transition-colors">
                    Login
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </nav>
    
          {/* ✅ Sidebar + Content */}
          <div className="flex flex-1">
            <Sidebar adminAccess={sidebarAccess} setActive={setActive}/>
            <div className="flex-1">
                {activeComponent ? <activeComponent /> : <Content activePage={active} />}
            </div>
          </div>
        </div>
      );
}