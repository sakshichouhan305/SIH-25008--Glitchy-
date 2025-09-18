import React, { useState } from "react";

export default function AdminMessages() {
	// Example messages
	const [messages, setMessages] = useState([
		{
			id: 1,
			sender: "Admin",
			recipient: "All",
			content: "Emergency drill scheduled for Friday at 10am.",
			date: "2025-09-18 09:00",
		},
		{
			id: 2,
			sender: "Admin",
			recipient: "Teachers",
			content: "Please update module completion status by Thursday.",
			date: "2025-09-17 15:30",
		},
	]);

	const [newMessage, setNewMessage] = useState({
		recipient: "All",
		content: "",
	});

	const handleChange = (e) => {
		setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
	};

	const handleSend = (e) => {
		e.preventDefault();
		if (!newMessage.content.trim()) {
			alert("Message content cannot be empty!");
			return;
		}
		const msg = {
			id: messages.length + 1,
			sender: "Admin",
			recipient: newMessage.recipient,
			content: newMessage.content,
			date: new Date().toLocaleString(),
		};
		setMessages([msg, ...messages]);
		setNewMessage({ recipient: "All", content: "" });
	};

	return (
		<div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
			<h2 className="text-2xl font-bold text-blue-700 text-center mb-6">📨 Admin Messages</h2>

			{/* Send Message Form */}
			<form onSubmit={handleSend} className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-200">
				<h3 className="text-lg font-semibold text-blue-700 mb-4">Send New Message</h3>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-600 mb-1">Recipient</label>
					<select
						name="recipient"
						value={newMessage.recipient}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
					>
						<option value="All">All</option>
						<option value="Teachers">Teachers</option>
						<option value="Students">Students</option>
					</select>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
					<textarea
						name="content"
						value={newMessage.content}
						onChange={handleChange}
						rows={3}
						placeholder="Type your message here..."
						className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
				>
					Send Message
				</button>
			</form>

			{/* Messages List */}
			<div className="space-y-4">
				{messages.length === 0 ? (
					<div className="text-center text-gray-500">No messages yet.</div>
				) : (
					messages.map((msg) => (
						<div key={msg.id} className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
							<div className="flex justify-between items-center mb-2">
								<span className="font-semibold text-blue-700">To: {msg.recipient}</span>
								<span className="text-xs text-gray-500">{msg.date}</span>
							</div>
							<div className="text-gray-800 mb-2">{msg.content}</div>
							<div className="text-xs text-gray-400">From: {msg.sender}</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
