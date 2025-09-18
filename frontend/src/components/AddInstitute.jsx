// src/components/AddInstitute.jsx
import React, { useState } from "react";
import { Building2, MapPin, Phone, Mail, UserPlus, Globe } from "lucide-react";

const AddInstitute = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    contactPerson: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Institute Added:", formData);
    alert("✅ Institute successfully added!");
  };

  const fields = [
    {
      label: "Institute Name",
      name: "name",
      icon: <Building2 size={18} className="text-blue-600" />,
      type: "text",
    },
    {
      label: "Address",
      name: "address",
      icon: <MapPin size={18} className="text-blue-600" />,
      type: "text",
    },
    {
      label: "Phone Number",
      name: "phone",
      icon: <Phone size={18} className="text-blue-600" />,
      type: "tel",
    },
    {
      label: "Email",
      name: "email",
      icon: <Mail size={18} className="text-blue-600" />,
      type: "email",
    },
    {
      label: "Website",
      name: "website",
      icon: <Globe size={18} className="text-blue-600" />,
      type: "text",
    },
    {
      label: "Contact Person",
      name: "contactPerson",
      icon: <UserPlus size={18} className="text-blue-600" />,
      type: "text",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-blue-200 p-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center tracking-wide">
          🏫 Add New Institute
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-6">
          {fields.map((field, index) => (
            <div key={index}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {field.label}
              </label>
              <div className="flex items-center gap-3 bg-white border border-blue-300 rounded-lg px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
                {field.icon}
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label}`}
                  className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                  required
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
          >
            ➕ Add Institute
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInstitute;
