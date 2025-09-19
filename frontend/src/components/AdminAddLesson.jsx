import React, { useState, useEffect } from "react";

export default function AdminAddLesson() {
    const [form, setForm] = useState({
        title: "",
        content: "",
        module: "",
    });
    const [modules, setModules] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [modulesLoading, setModulesLoading] = useState(false);

    // Fetch available modules for the dropdown
    useEffect(() => {
        const fetchModules = async () => {
            setModulesLoading(true);
            setError("");
            try {
                const res = await fetch("http://localhost:3000/api/modules", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    mode: "cors",
                });
                // parse safely
                const json = await res.json().catch(() => null);
                if (!res.ok) {
                    throw new Error((json && json.message) || `Failed to load modules (${res.status})`);
                }
                // backend uses { success, message, data: { modules, ... } } or may return array
                const list = json?.data?.modules || json?.modules || json || [];
                setModules(Array.isArray(list) ? list : []);
            } catch (err) {
                console.error("Failed to fetch modules:", err);
                setError("Failed to load modules");
            } finally {
                setModulesLoading(false);
            }
        };

        fetchModules();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
        setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            // build payload; include createdBy only if available in localStorage
            const userId = localStorage.getItem("userId");
            const payload = {
                title: form.title,
                content: form.content,
                module: form.module,
                ...(userId ? { createdBy: userId } : {}),
            };

            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3000/api/lessons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                mode: "cors",
                body: JSON.stringify(payload),
            });

            const json = await res.json().catch(() => null);
            if (!res.ok) {
                throw new Error((json && json.message) || `Failed to create lesson (${res.status})`);
            }

            setSuccess(true);
            setForm({ title: "", content: "", module: "" });
        } catch (err) {
            console.error("Error creating lesson:", err);
            setError(err.message || "Failed to create lesson");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">📝 Add New Lesson</h2>

            {error && (
                <div className="mb-4 text-red-600 text-center font-semibold p-2 bg-red-50 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 text-green-600 text-center font-semibold">
                    Lesson added successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Lesson Title*
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter lesson title"
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Content
                    </label>
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        placeholder="Enter lesson content"
                        rows={4}
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Select Module*
                    </label>
                    <select
                        name="module"
                        value={form.module}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
                    >
                        <option value="">{modulesLoading ? "Loading modules..." : "Select a module"}</option>
                        {modules.map((module) => (
                            <option key={module._id || module.id} value={module._id || module.id}>
                                {module.title}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-2 rounded-lg transition`}
                >
                    {loading ? 'Adding Lesson...' : 'Add Lesson'}
                </button>
            </form>
        </div>
    );
}