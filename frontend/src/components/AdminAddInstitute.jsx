import React, { useState } from "react";

export default function AdminAddInstitute() {
	const [form, setForm] = useState({
		name: "",
		code: "",
		address: "",
		contact: "",
		email: "",
		principal: "",
	});
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// 🔹 Backend API call here
		setSuccess(true);
		setForm({ name: "", code: "", address: "", contact: "", email: "", principal: "" });
	};

	return (
		<div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
			<h2 className="text-2xl font-bold text-blue-700 text-center mb-6">🏫 Add New Institute</h2>
			{success && (
				<div className="mb-4 text-green-600 text-center font-semibold">Institute added successfully!</div>
			)}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-600 mb-1">Institute Name</label>
					<input
						type="text"
						name="name"
						value={form.name}
						onChange={handleChange}
						required
						placeholder="Enter institute name"
						className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-600 mb-1">Institute Code</label>
					<input
						type="text"
						name="code"
						value={form.code}
						onChange={handleChange}
						required
						placeholder="Enter institute code"
						className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
					<input
						type="text"
						name="address"
						value={form.address}
						onChange={handleChange}
						required
						placeholder="Enter address"
						className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-600 mb-1">Contact</label>
					<input
						type="text"
						name="contact"
						value={form.contact}
						onChange={handleChange}
						required
						placeholder="Enter contact number"
						className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						required
						placeholder="Enter email"
						className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-600 mb-1">Principal Name</label>
					<input
						type="text"
						name="principal"
						value={form.principal}
						onChange={handleChange}
						required
						placeholder="Enter principal name"
						className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
				>
					Add Institute
				</button>
			</form>
		</div>
	);
}
