import React, { useState } from "react";
import { motion } from "framer-motion";

export default function VirtualPage() {
  const [showVirtualForm, setShowVirtualForm] = useState(false);
  const [showElementForm, setShowElementForm] = useState(false);
  const [showActionForm, setShowActionForm] = useState(false);
  const [showConstraintForm, setShowConstraintForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // handle image upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      {/* Add Virtual Button */}
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        onClick={() => setShowVirtualForm(true)}
      >
        + Add Virtual
      </button>

      {/* Virtual Form */}
      {showVirtualForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 p-6 bg-white rounded-lg shadow w-96"
        >
          <h2 className="text-lg font-semibold mb-4">🎮 Virtual</h2>
          <input
            type="text"
            placeholder="Enter Virtual Name"
            className="border p-2 w-full mb-4 rounded-md focus:ring focus:ring-blue-200 outline-none"
          />
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={() => setShowElementForm(true)}
          >
            + Add Element
          </button>
        </motion.div>
      )}

      {/* Element Form */}
      {showElementForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 ml-6 p-6 bg-white rounded-lg shadow w-96"
        >
          <h2 className="text-lg font-semibold mb-4">🧩 Element</h2>
          <input
            type="text"
            placeholder="Element Name"
            className="border p-2 w-full mb-3 rounded-md"
          />

          <div className="flex gap-3 mb-3">
            <input
              type="number"
              placeholder="Position X"
              className="border p-2 w-full rounded-md"
            />
            <input
              type="number"
              placeholder="Position Y"
              className="border p-2 w-full rounded-md"
            />
          </div>

          <div className="flex items-center gap-2 mb-3">
            <input type="checkbox" id="isStatic" className="w-4 h-4" />
            <label htmlFor="isStatic">Is Static</label>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 w-full mb-3 rounded-md cursor-pointer"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-32 object-contain mb-4 rounded-md border"
            />
          )}

          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            onClick={() => setShowActionForm(true)}
          >
            + Add Action
          </button>
        </motion.div>
      )}

      {/* Action Form */}
      {showActionForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 ml-12 p-6 bg-white rounded-lg shadow w-96"
        >
          <h2 className="text-lg font-semibold mb-4">⚡ Action</h2>
          <input type="text" placeholder="Action Name" className="border p-2 w-full mb-2 rounded-md" />
          <input type="text" placeholder="From" className="border p-2 w-full mb-2 rounded-md" />
          <input type="text" placeholder="To" className="border p-2 w-full mb-2 rounded-md" />
          <input type="number" placeholder="Frame Rate" className="border p-2 w-full mb-2 rounded-md" />
          <input type="text" placeholder="Frame Size" className="border p-2 w-full mb-2 rounded-md" />
          <select className="border p-2 w-full mb-3 rounded-md">
            <option value="">Loop?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={() => setShowConstraintForm(true)}
          >
            + Add Constraint
          </button>
        </motion.div>
      )}

      {/* Constraint Form */}
      {showConstraintForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 ml-20 p-6 bg-white rounded-lg shadow w-96"
        >
          <h2 className="text-lg font-semibold mb-4">🔒 Constraint</h2>
          <input type="text" placeholder="Constraint Name" className="border p-2 w-full mb-3 rounded-md" />
          <input type="text" placeholder="Value" className="border p-2 w-full mb-3 rounded-md" />
        </motion.div>
      )}
    </div>
  );
}