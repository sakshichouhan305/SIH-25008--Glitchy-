import React, { useState } from "react";

export default function InstituteDetails() {
  // Default institute data
  const [institute, setInstitute] = useState({
    name: "National Public School",
    code: "NPS123",
    address: "123 MG Road, Indore, MP",
    contact: "+91 98765 12345",
    email: "info@npschool.edu",
    principal: "Dr. Meera Joshi",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setInstitute({ ...institute, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);

    // 🔹 Backend API call yaha karein
    console.log("Updated Institute Data:", institute);
    alert("Institute details updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        🏫 Institute Details
      </h2>

      {!isEditing ? (
        // ✅ View Mode
        <div className="space-y-4">
          {Object.entries(institute).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col border border-blue-200 rounded-lg p-4 bg-blue-50 hover:shadow-md transition"
            >
              <span className="text-sm text-gray-600 font-medium capitalize">
                {key}
              </span>
              <span className="text-gray-800 font-semibold">{value}</span>
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Edit Details
            </button>
          </div>
        </div>
      ) : (
        // ✅ Edit Mode
        <form onSubmit={handleSave} className="space-y-4">
          {Object.entries(institute).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm text-gray-600 font-medium capitalize mb-1">
                {key}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
          ))}

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}