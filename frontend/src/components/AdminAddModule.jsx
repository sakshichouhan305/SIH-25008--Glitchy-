import React, { useState, useEffect } from "react";

export default function AdminAddModule() {
	const [form, setForm] = useState({
		title: "",
		description: "",
		category: "",
		duration: "",
		level: "beginner", // normalize to lowercase to match backend
		allowedDistricts: "", // <-- added to avoid undefined
	});
	const [success, setSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const [modules, setModules] = useState([]);
	const [modulesLoading, setModulesLoading] = useState(false);
	const [modulesError, setModulesError] = useState("");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const fetchModules = async () => {
		setModulesLoading(true);
		setModulesError("");
		try {
			const res = await fetch("http://localhost:3000/api/modules", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				mode: "cors",
			});
			const json = await res.json();
			if (!res.ok) {
				throw new Error(
					(json && json.message) ||
						`Failed to fetch modules (${res.status})`
				);
			}
			// backend returns { success, message, data: { modules, ... } }
			const list = json?.data?.modules || [];
			setModules(list);
		} catch (err) {
			console.error("Error fetching modules:", err);
			setModulesError(err.message || "Failed to load modules");
		} finally {
			setModulesLoading(false);
		}
	};

	useEffect(() => {
		fetchModules();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		setSuccess(false);

		try {
			const payload = {
				...form,
				allowedDistricts: (form.allowedDistricts || "")
					.split(",")
					.map((d) => d.trim())
					.filter((d) => d),
				// ensure level is lowercase to match DB enum
				level: (form.level || "beginner").toLowerCase(),
			};

			const response = await fetch("http://localhost:3000/api/modules", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`, // <-- added token header
				},
				mode: "cors",
				body: JSON.stringify(payload),
			});

			// attempt to parse JSON safely
			let data;
			try {
				data = await response.json();
			} catch (parseErr) {
				data = null;
			}

			if (!response.ok) {
				// show server-provided message if available
				throw new Error(
					(data && data.message) ||
						`Request failed with status ${response.status}`
				);
			}

			setSuccess(true);
			setForm({
				title: "",
				description: "",
				allowedDistricts: "",
				level: "beginner",
			});

			// Refresh module list after successful creation
			try {
				await fetchModules();
			} catch (err) {
				// fetchModules already logs errors; no-op here
			}
		} catch (err) {
			console.error("Error creating module:", err);
			setError(err.message || "Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		// layout changed: form on left, modules list on right
		<div className="max-w-5xl mx-auto mt-10">
			<div className="flex gap-6">
				{/* Left: form */}
				<div className="flex-1 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
					<h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
						📚 Add New Module
					</h2>
					{success && (
						<div className="mb-4 text-green-600 text-center font-semibold">
							Module added successfully!
						</div>
					)}
					{error && (
						<div className="mb-4 text-red-600 text-center font-semibold">
							{error}
						</div>
					)}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Module Title
							</label>
							<input
								type="text"
								name="title"
								value={form.title}
								onChange={handleChange}
								required
								placeholder="Enter module title"
								className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Description
							</label>
							<textarea
								name="description"
								value={form.description}
								onChange={handleChange}
								required
								placeholder="Enter module description"
								rows={3}
								className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Category
							</label>
							<input
								type="text"
								name="category"
								value={form.category}
								onChange={handleChange}
								required
								placeholder="Enter category (e.g. Fire Safety)"
								className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Duration (in minutes)
							</label>
							<input
								type="number"
								name="duration"
								value={form.duration}
								onChange={handleChange}
								required
								placeholder="Enter duration"
								className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Level
							</label>
							<select
								name="level"
								value={form.level}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
							>
								<option value="beginner">Beginner</option>
								<option value="intermediate">Intermediate</option>
								<option value="advanced">Advanced</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-600 mb-1">
								Allowed Districts
							</label>
							<input
								type="text"
								name="allowedDistricts"
								value={form.allowedDistricts}
								onChange={handleChange}
								placeholder="Comma separated (e.g. Mumbai, Pune)"
								className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
						>
							{isLoading ? "Adding Module..." : "Add Module"}
						</button>
					</form>
				</div>

				{/* Right: sidebar list */}
				<aside className="w-80 bg-white shadow rounded-2xl p-4 border border-gray-200">
					<h3 className="text-lg font-semibold mb-3">Modules</h3>
					{modulesLoading && (
						<div className="text-sm text-gray-500">Loading...</div>
					)}
					{modulesError && (
						<div className="text-sm text-red-500">{modulesError}</div>
					)}
					{!modulesLoading && !modulesError && modules.length === 0 && (
						<div className="text-sm text-gray-500">No modules found.</div>
					)}
					<ul className="space-y-3 overflow-auto max-h-[60vh]">
						{modules.map((m) => (
							<li
								key={m._id}
								className="p-3 rounded-md hover:bg-gray-50"
							>
								<div className="font-medium text-sm">{m.title}</div>
								<div className="text-xs text-gray-500">
									{m.level} ·{" "}
									{m.allowedDistricts
										?.slice(0, 3)
										.join(", ") || "All districts"}
								</div>
								{/* optional: createdBy name if present */}
								{m.createdBy?.name && (
									<div className="text-xs text-gray-400">
										By {m.createdBy.name}
									</div>
								)}
							</li>
						))}
					</ul>
				</aside>
			</div>
		</div>
	);
}
