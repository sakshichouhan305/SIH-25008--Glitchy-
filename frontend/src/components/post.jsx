import React, { useEffect, useState } from "react";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // { _id, title, content }
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const role = localStorage.getItem("role")?.toLowerCase();
  const userId = localStorage.getItem("userId"); // used to determine ownership for institute-admin

  const apiBase = "http://localhost:3000/api/posts";

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(apiBase, { mode: "cors" });
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

  const canManage = (post) => {
    if (!role) return false;
    if (role === "admin") return true;
    if (role === "institute-admin" && userId && post.createdBy && (post.createdBy._id === userId || post.createdBy === userId)) return true;
    return false;
  };

  const openEdit = (post) => {
    setEditing({ _id: post._id, title: post.title || "", content: post.content || "" });
    setError("");
  };

  const closeEdit = () => {
    setEditing(null);
    setSaving(false);
  };

  const handleEditChange = (e) => {
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    if (!editing.title.trim() || !editing.content.trim()) {
      setError("Title and content are required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiBase}/${editing._id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ title: editing.title, content: editing.content }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || `Failed to update post (${res.status})`);
      await fetchPosts();
      closeEdit();
    } catch (err) {
      console.error("Update post error:", err);
      setError(err.message || "Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    setDeletingId(id);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiBase}/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || `Failed to delete post (${res.status})`);
      await fetchPosts();
    } catch (err) {
      console.error("Delete post error:", err);
      setError(err.message || "Failed to delete post");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">Institute & Admin Posts</h2>

      {error && (
        <div className="mb-4 text-red-600 text-center font-semibold p-2 bg-red-50 rounded">
          {error}
        </div>
      )}
      {loading && <div className="text-center text-gray-500 mb-4">Loading posts...</div>}

      <div className="space-y-6">
        {posts.length === 0 && !loading && (
          <div className="text-center text-gray-500">No posts available.</div>
        )}

        {posts.map((post) => (
          <div key={post._id} className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                <div className="text-xs text-gray-500">By: {post.createdBy?.name || post.createdBy?.email || "Unknown"}</div>
                <div className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                {canManage(post) && (
                  <>
                    <button
                      onClick={() => openEdit(post)}
                      className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(post._id)}
                      className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
                      disabled={deletingId === post._id}
                    >
                      {deletingId === post._id ? "Deleting..." : "Delete"}
                    </button>
                  </>
                )}
              </div>
            </div>

            <p className="mt-3 text-gray-700 whitespace-pre-line">{post.content}</p>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={closeEdit}></div>
          <div className="relative bg-white shadow-xl rounded-3xl p-8 z-10 w-full max-w-xl border border-blue-200">
            <h4 className="text-2xl font-bold text-blue-700 text-center mb-4">Edit Post</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                <input
                  name="title"
                  value={editing.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
                <textarea
                  name="content"
                  value={editing.content}
                  onChange={handleEditChange}
                  rows={6}
                  placeholder="Content"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              {error && <div className="text-red-600 text-center">{error}</div>}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={closeEdit}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  disabled={saving}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
