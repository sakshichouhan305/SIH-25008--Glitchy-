import React, { useState } from "react";

export default function AdminInstitution() {
	// Example registered institutes
	const [institutes, setInstitutes] = useState([
		{
			id: 1,
			name: "National Public School",
			code: "NPS123",
			address: "123 MG Road, Indore, MP",
			contact: "+91 98765 12345",
			email: "info@npschool.edu",
			principal: "Dr. Meera Joshi",
		},
		{
			id: 2,
			name: "Green Valley Academy",
			code: "GVA456",
			address: "456 Park Lane, Bhopal, MP",
			contact: "+91 91234 56789",
			email: "contact@gva.edu",
			principal: "Mr. Rajesh Kumar",
		},
	]);

	const handleDelete = (id) => {
		setInstitutes(institutes.filter(inst => inst.id !== id));
	};

	return (
		<div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
			<h2 className="text-2xl font-bold text-blue-700 text-center mb-6">🏫 Registered Institutes</h2>
			{institutes.length === 0 ? (
				<div className="text-center text-gray-500">No institutes found.</div>
			) : (
				<div className="overflow-x-auto">
					<table className="w-full border border-blue-200 rounded-lg overflow-hidden">
						<thead className="bg-blue-600 text-white">
							<tr>
								<th className="py-3 px-4 text-left">Name</th>
								<th className="py-3 px-4 text-left">Code</th>
								<th className="py-3 px-4 text-left">Principal</th>
								<th className="py-3 px-4 text-left">Contact</th>
								<th className="py-3 px-4 text-left">Email</th>
								<th className="py-3 px-4 text-left">Address</th>
								<th className="py-3 px-4 text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{institutes.map((inst, idx) => (
								<tr key={inst.id} className={idx % 2 === 0 ? "bg-blue-50" : "bg-white"}>
									<td className="py-3 px-4 font-medium">{inst.name}</td>
									<td className="py-3 px-4">{inst.code}</td>
									<td className="py-3 px-4">{inst.principal}</td>
									<td className="py-3 px-4">{inst.contact}</td>
									<td className="py-3 px-4">{inst.email}</td>
									<td className="py-3 px-4">{inst.address}</td>
									<td className="py-3 px-4 text-center">
										<button
											onClick={() => handleDelete(inst.id)}
											className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
										>Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
