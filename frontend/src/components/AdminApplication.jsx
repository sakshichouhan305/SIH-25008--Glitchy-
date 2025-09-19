import React, { useEffect, useState } from "react";

export default function AdminApplication() {
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const apiBase = "http://localhost:3000";

	const fetchApplications = async () => {
		setLoading(true);
		setError("");
		try {
			const token = localStorage.getItem("token");
			const res = await fetch(`${apiBase}/api/applications`, {
				method: "GET",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
			});
			const json = await res.json().catch(() => null);
			if (!res.ok) throw new Error(json?.message || `Failed to load applications (${res.status})`);
			// backend returns array
			setApplications(Array.isArray(json) ? json : json.applications || []);
		} catch (err) {
			console.error("Fetch applications error:", err);
			setError("Failed to load applications");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchApplications();
	}, []);

	const handleAction = async (id, action) => {
		// action should be 'approved' or 'rejected'
		if (!window.confirm(`Mark application as ${action}?`)) return;
		try {
			const token = localStorage.getItem("token");
			const res = await fetch(`${apiBase}/api/applications/${id}`, {
				method: "PUT",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
				body: JSON.stringify({ status: action }),
			});
			const json = await res.json().catch(() => null);
			if (!res.ok) throw new Error(json?.message || `Failed to update (${res.status})`);
			// update local state
			setApplications((prev) => prev.map(app => app._id === id ? { ...app, status: action } : app));
		} catch (err) {
			console.error("Update application error:", err);
			setError(err.message || "Failed to update application");
		}
	};

	return (
		<div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
			<h2 className="text-2xl font-bold text-blue-700 text-center mb-6">🏫 Institute Applications</h2>
			{loading && <div className="text-center text-gray-500">Loading...</div>}
			{!loading && error && <div className="text-center text-red-600">{error}</div>}
			{!loading && !error && applications.length === 0 && (
				<div className="text-center text-gray-500">No applications found.</div>
			)}
			{!loading && !error && applications.length > 0 && (
				<div className="space-y-6">
					{applications.map((app) => (
						<div key={app._id} className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
							<div className="flex justify-between items-center mb-2">
								<span className="font-semibold text-blue-700">{app.institute}</span>
								<span className="text-xs text-gray-500">{new Date(app.createdAt || app.date || Date.now()).toLocaleDateString()}</span>
							</div>
							<div className="grid grid-cols-2 gap-4 mb-4">
								<div>
									<div className="text-sm text-gray-600 font-medium">Code</div>
									<div className="text-gray-800 font-semibold">{app.instituteCode || "—"}</div>
								</div>
								<div>
									<div className="text-sm text-gray-600 font-medium">Contact</div>
									<div className="text-gray-800 font-semibold">{app.phone}</div>
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
								<span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === "pending" ? "bg-yellow-100 text-yellow-700" : app.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
									{(app.status || "").toUpperCase()}
								</span>
								{app.status === "pending" && (
									<div className="flex gap-2">
										<button
											onClick={() => handleAction(app._id, "approved")}
											className="px-4 py-1 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
										>Approve</button>
										<button
											onClick={() => handleAction(app._id, "rejected")}
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
