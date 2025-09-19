
import React, { useEffect } from "react";


const ModulesRead = () => {
    const [modules, setModules] = React.useState([]);
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/modules", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    mode: "cors",
                });
                const json = await response.json();
                if (!response.ok) {
                    throw new Error((json && json.message) || `Failed to fetch modules (${response.status})`);
                }
                // backend returns { success, message, data: { modules, ... } }
                console.log("Modules fetched:", json?.data?.modules );
                setModules(json?.data?.modules);
            } catch (err) {
                console.error("Error fetching modules:", err);
            } 
        };

        fetchModules();
    }, []);
    return (
        <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {modules.length > 0 ? (
    modules.map((module) => (
      <div
        key={module._id}
        className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          {module.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {module.description}
        </p>

        {/* Details */}
        <div className="space-y-1 text-sm text-gray-500">
          <p>
            <span className="font-medium text-gray-700">📂 Category:</span>{" "}
            {module.category}
          </p>
          <p>
            <span className="font-medium text-gray-700">⏳ Duration:</span>{" "}
            {module.duration} hours
          </p>
          <p>
            <span className="font-medium text-gray-700">🎯 Level:</span>{" "}
            {module.level}
          </p>
          <p>
            <span className="font-medium text-gray-700">🏢 Districts:</span>{" "}
            {Array.isArray(module.allowedDistricts)
              ? module.allowedDistricts.join(", ")
              : module.allowedDistricts}
          </p>
        </div>

        {/* Action Button */}
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition">
          View Module
        </button>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center col-span-full">
      No modules available.
    </p>
  )}
</div>

    );
}
export default ModulesRead;
