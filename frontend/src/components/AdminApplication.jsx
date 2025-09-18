import React, { useState } from "react";

export default function AdminApplication() {
	// Example applications
	const [applications, setApplications] = useState([
		{
			id: 1,
			institute: "National Public School",
			code: "NPS123",
			address: "123 MG Road, Indore, MP",
			contact: "+91 98765 12345",
			email: "info@npschool.edu",
			status: "Pending",
			date: "2025-09-18",
		},
		{
			id: 2,
			institute: "Green Valley Academy",
			code: "GVA456",
			address: "456 Park Lane, Bhopal, MP",
			contact: "+91 91234 56789",
			email: "contact@gva.edu",
			status: "Pending",
			date: "2025-09-17",
		},
	]);

	const handleAction = (id, action) => {
		setApplications(applications.map(app =>
			app.id === id ? { ...app, status: action } : app
		));
	};

	return (
		<div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
			<h2 className="text-2xl font-bold text-blue-700 text-center mb-6">🏫 Institute Applications</h2>
			{applications.length === 0 ? (
				<div className="text-center text-gray-500">No applications found.</div>
			) : (
				<div className="space-y-6">
					{applications.map(app => (
						<div key={app.id} className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
							<div className="flex justify-between items-center mb-2">
								<span className="font-semibold text-blue-700">{app.institute}</span>
								<span className="text-xs text-gray-500">{app.date}</span>
							</div>
							<div className="grid grid-cols-2 gap-4 mb-4">
								<div>
									<div className="text-sm text-gray-600 font-medium">Code</div>
									<div className="text-gray-800 font-semibold">{app.code}</div>
								</div>
								<div>
									<div className="text-sm text-gray-600 font-medium">Contact</div>
									<div className="text-gray-800 font-semibold">{app.contact}</div>
								</div>
								<div>
									<div className="text-sm text-gray-600 font-medium">Email</div>
									<div className="text-gray-800 font-semibold">{app.email}</div>
								</div>
								<div>
									<div className="text-sm text-gray-600 font-medium">Address</div>
									<div className="text-gray-800 font-semibold">{app.address}</div>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === "Pending" ? "bg-yellow-100 text-yellow-700" : app.status === "Approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
									{app.status}
								</span>
								{app.status === "Pending" && (
									<div className="flex gap-2">
										<button
											onClick={() => handleAction(app.id, "Approved")}
											className="px-4 py-1 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
										>Approve</button>
										<button
											onClick={() => handleAction(app.id, "Rejected")}
											className="px-4 py-1 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
										>Reject</button>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
