import React, { useState } from "react";

export default function StudentManagement() {
  // Default students
  const [students, setStudents] = useState([
    { id: 1, name: "Rohit Sharma", roll: "101", class: "10th", contact: "+91 98765 12345" },
    { id: 2, name: "Priya Verma", roll: "102", class: "10th", contact: "+91 91234 56789" },
    { id: 3, name: "Amit Singh", roll: "103", class: "9th", contact: "+91 99887 66554" },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    roll: "",
    class: "",
    contact: "",
  });

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.roll || !newStudent.class) {
      alert("Please fill all required fields!");
      return;
    }

    setStudents([
      ...students,
      { id: students.length + 1, ...newStudent },
    ]);
    setNewStudent({ name: "", roll: "", class: "", contact: "" });
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        🎓 Student Management
      </h2>

      {/* Student List */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full border border-blue-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Roll No.</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Class</th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr
                key={student.id}
                className={`${
                  idx % 2 === 0 ? "bg-blue-50" : "bg-white"
                } hover:bg-blue-100 transition`}
              >
                <td className="py-3 px-4">{student.roll}</td>
                <td className="py-3 px-4 font-medium">{student.name}</td>
                <td className="py-3 px-4">{student.class}</td>
                <td className="py-3 px-4">{student.contact}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Student Form */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-700 mb-4">
          ➕ Add New Student
        </h3>
        <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="roll"
            value={newStudent.roll}
            onChange={handleChange}
            placeholder="Roll No."
            className="px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="class"
            value={newStudent.class}
            onChange={handleChange}
            placeholder="Class"
            className="px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="contact"
            value={newStudent.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            className="px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
          />

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}