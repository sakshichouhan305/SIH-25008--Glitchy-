import React, { useState } from "react";

export default function AdminAddModule() {
	const [form, setForm] = useState({
		title: "",
		description: "",
		category: "",
		duration: "",
		level: "Beginner",
	});
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// 🔹 Backend API call here
		setSuccess(true);
		setForm({ title: "", description: "", category: "", duration: "", level: "Beginner" });
	};

	return (
		<div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
			<h2 className="text-2xl font-bold text-blue-700 text-center mb-6">📚 Add New Module</h2>
			{success && (
				<div className="mb-4 text-green-600 text-center font-semibold">Module added successfully!</div>
			)}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-600 mb-1">Module Title</label>
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
					<label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
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
					<label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
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
					<label className="block text-sm font-medium text-gray-600 mb-1">Duration (in minutes)</label>
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
					<label className="block text-sm font-medium text-gray-600 mb-1">Level</label>
					<select
						name="level"
						value={form.level}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
					>
						<option value="Beginner">Beginner</option>
						<option value="Intermediate">Intermediate</option>
						<option value="Advanced">Advanced</option>
					</select>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
				>
					Add Module
				</button>
			</form>
		</div>
	);
}
