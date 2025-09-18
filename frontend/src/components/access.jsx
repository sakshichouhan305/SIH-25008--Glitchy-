import { useState, useEffect } from 'react';

const studentAccess = [
  {
    name: "Module",
    icon: "📚"
  },
  {
    name: "Scoreboard",
    icon: "📊"
  },
  {
    name: "Leaderboard",
    icon: "🏆"
  },
  {
    name: "Student Profile",
    icon: "👤"
  },
  {
    name: "Posts",
    icon: "📝"
  },
  {
    name: "Logout",
    icon: "🚪"
  }
];

const teacherAccess = [
  {
    name: "Institution",
    icon: "🏫"
  },
  {
    name: "Dashboard",
    icon: "📊"
  },
  {
    name: "Leaderboard",
    icon: "🏆"
  },
  {
    name: "Profile",
    icon: "👤"
  },
  {
    name: "Add Admin",
    icon: "➕"
  },
  {
    name: "Posts",
    icon: "📝"
  },
  {
    name: "Management",
    icon: "⚙️"
  },

];

const adminAccess = [
  {
    name: "Application",
    icon: "📱"
  },
  {
    name: "Add Institute",
    icon: "🏫"
  },
  {
    name: "Add Module",
    icon: "📚"
  },
  {
    name: "Quizes",
    icon: "✍️"
  },
  {
    name: "Add Drill",
    icon: "🎯"
  },
  {
    name: "Message",
    icon: "💬"
  },
  {
    name: "New Admin",
    icon: "👥"
  },
  {
    name: "Institution",
    icon: "🏢"
  },
 
];

export default function Access() {
  const [sidebarItems, setSidebarItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    switch(userRole?.toLowerCase()) {
      case 'student':
        setSidebarItems(studentAccess);
        break;
      case 'teacher':
        setSidebarItems(teacherAccess);
        break;
      case 'admin':
        setSidebarItems(adminAccess);
        break;
      default:
        setSidebarItems([]);
    }
  }, []);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    // Add navigation or content change logic here
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleItemClick(item.name)}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeItem === item.name
                      ? 'bg-blue-600'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export { studentAccess, teacherAccess, adminAccess };