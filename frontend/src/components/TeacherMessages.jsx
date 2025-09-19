import React, { useEffect, useState } from "react";

// This component intentionally mirrors AdminMessages but is named for teacher/institute-admin usage.
export default function TeacherMessages() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [newPost, setNewPost] = useState({ title: "", content: "" });
	const role = localStorage.getItem("role")?.toLowerCase();

	const fetchPosts = async () => {
		setLoading(true);
		setError("");
		try {
			const res = await fetch("http://localhost:3000/api/posts", { mode: "cors" });
			const json = await res.json().catch(() => null);
			if (!res.ok) throw new Error(json?.message || `Failed to fetch posts (${res.status})`);
			setPosts(Array.isArray(json) ? json : json.posts || json);
		} catch (err) {
			console.error("Fetch posts error:", err);
			setError("Failed to load posts");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const handleChange = (e) => {
		setNewPost({ ...newPost, [e.target.name]: e.target.value });
	};

	const handleSend = async (e) => {
		e.preventDefault();
		if (!newPost.title.trim() || !newPost.content.trim()) {
			alert("Title and content are required");
			return;
		}
		setError("");
		try {
			const token = localStorage.getItem("token");
			const res = await fetch("http://localhost:3000/api/posts", {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					...(token ? { Authorization: `Bearer ${token}` } : {}),
				},
				body: JSON.stringify(newPost),
			});
			const json = await res.json().catch(() => null);
			if (!res.ok) throw new Error(json?.message || `Failed to create post (${res.status})`);
			await fetchPosts();
			setNewPost({ title: "", content: "" });
		} catch (err) {
			console.error("Create post error:", err);
			setError(err.message || "Failed to create post");
		}
	};

	return (
		<div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
			<h2 className="text-2xl font-bold text-blue-700 text-center mb-6">📨 Institute Posts</h2>

			{(role === "admin" || role === "institute-admin") && (
				<form onSubmit={handleSend} className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-200">
					<div className="mb-3">
						<input name="title" value={newPost.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
					</div>
					<div className="mb-3">
						<textarea name="content" value={newPost.content} onChange={handleChange} rows={3} placeholder="Message" className="w-full p-2 border rounded" />
					</div>
					{error && <div className="text-red-600 mb-2">{error}</div>}
					<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
				</form>
			)}

			<div className="space-y-4">
				{loading && <div className="text-center text-gray-500">Loading...</div>}
				{!loading && posts.length === 0 && <div className="text-center text-gray-500">No posts yet.</div>}
				{!loading && posts.map((post) => (
					<div key={post._id} className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
						<div className="flex justify-between items-center mb-2">
							<span className="font-semibold text-blue-700">{post.title}</span>
							<span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
						</div>
						<div className="text-gray-800 mb-2">{post.content}</div>
						<div className="text-xs text-gray-400">From: {post.createdBy?.name || post.createdBy?.email || 'Unknown'}</div>
					</div>
				))}
			</div>
		</div>
	);
}