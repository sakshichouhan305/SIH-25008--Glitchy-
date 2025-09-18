import React from "react";

export default function TeacherProfile({ teacher }) {
  const defaultTeacher = {
    name: "Anita Sharma",
    email: "anita.sharma@school.edu",
    role: "Teacher",
    subject: "Disaster Management",
    phone: "+91 98765 43210",
    img: "https://i.pravatar.cc/150?img=11",
  };

  const profile = teacher || defaultTeacher;

  return (
    <div className="max-w-md mx-auto mt-10 bg-gradient-to-b from-blue-50 to-white shadow-xl rounded-3xl p-8 border border-blue-100">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={profile.img}
            alt={profile.name}
            className="w-28 h-28 rounded-full border-4 border-blue-200 shadow-md object-cover"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">{profile.name}</h2>
        <p className="text-sm text-blue-600 font-semibold tracking-wide">
          {profile.role}
        </p>
      </div>

      {/* Profile Info */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <span className="text-gray-600 font-medium">📧 Email</span>
          <span className="text-gray-800 text-sm">{profile.email}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <span className="text-gray-600 font-medium">📘 Subject</span>
          <span className="text-gray-800 text-sm">{profile.subject}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <span className="text-gray-600 font-medium">📞 Phone</span>
          <span className="text-gray-800 text-sm">{profile.phone}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-center gap-4">
        <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Edit Profile
        </button>
        <button className="px-5 py-2 bg-white text-blue-600 font-semibold border border-blue-200 rounded-lg hover:bg-blue-50 transition">
          Logout
        </button>
      </div>
    </div>
  );
}