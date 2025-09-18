import React from "react";

// Example post data (replace with API or props in future)
const posts = [
  {
    id: 1,
    title: "Fire Drill Scheduled",
    description: "A fire drill will be conducted on 22nd September at 11:00 AM. All students and staff must participate.",
    author: "Admin",
    institute: "SurakshaEd College",
    date: "2025-09-18",
    tags: ["Drill", "Safety", "Event"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "New Module: Earthquake Preparedness",
    description: "A new interactive module on earthquake preparedness is now available for all students. Complete it by the end of the month.",
    author: "Institute",
    institute: "SurakshaEd School",
    date: "2025-09-17",
    tags: ["Module", "Education", "Earthquake"],
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Emergency Contact Update",
    description: "Please update your emergency contact details in your profile section by this week.",
    author: "Admin",
    institute: "SurakshaEd University",
    date: "2025-09-16",
    tags: ["Profile", "Emergency"],
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  }
];

export default function Post() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center">Institute & Admin Posts</h2>
      <div className="grid gap-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-shadow">
            <img src={post.image} alt={post.title} className="w-full md:w-48 h-40 object-cover rounded-xl border border-gray-200" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-3">{post.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <span>By <span className="font-semibold text-blue-600">{post.author}</span> | {post.institute}</span>
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
