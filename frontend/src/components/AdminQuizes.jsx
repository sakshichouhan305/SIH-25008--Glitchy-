import React, { useState } from "react";

export default function AdminQuizes() {
	// Example quizzes
	const [quizzes, setQuizzes] = useState([
		{
			id: 1,
			title: "Fire Safety Quiz",
			questions: 10,
			category: "Fire Safety",
			level: "Beginner",
		},
		{
			id: 2,
			title: "Earthquake Preparedness Quiz",
			questions: 8,
			category: "Earthquake",
			level: "Intermediate",
		},
	]);

	const [form, setForm] = useState({
		title: "",
		questions: "",
		category: "",
		level: "Beginner",
	});
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setQuizzes([
			...quizzes,
			{
				id: quizzes.length + 1,
				...form,
				questions: Number(form.questions),
			},
		]);
		setSuccess(true);
		setForm({ title: "", questions: "", category: "", level: "Beginner" });
		setTimeout(() => setSuccess(false), 1500);
	};

	const handleDelete = (id) => {
		setQuizzes(quizzes.filter(q => q.id !== id));
	};

	return (
		<div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-3xl p-8 border border-blue-200">
			<h2 className="text-2xl font-bold text-blue-700 text-center mb-6">📝 Manage Quizzes</h2>

			{/* Add Quiz Form */}
			<form onSubmit={handleSubmit} className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-200 space-y-4">
				<h3 className="text-lg font-semibold text-blue-700 mb-4">Add New Quiz</h3>
				{success && <div className="mb-2 text-green-600 text-center font-semibold">Quiz added successfully!</div>}
				<div>
					<label className="block text-sm font-medium text-gray-600 mb-1">Quiz Title</label>
					<input
						type="text"
						name="title"
						value={form.title}
						onChange={handleChange}
						required
						placeholder="Enter quiz title"
						className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring focus:ring-blue-300"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-600 mb-1">Number of Questions</label>
					<input
						type="number"
						name="questions"
						value={form.questions}
						onChange={handleChange}
						required
						min={1}
						placeholder="Enter number of questions"
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
					Add Quiz
				</button>
			</form>

			{/* Quizzes List */}
			<div className="space-y-4">
				{quizzes.length === 0 ? (
					<div className="text-center text-gray-500">No quizzes found.</div>
				) : (
					quizzes.map((quiz) => (
						<div key={quiz.id} className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm flex justify-between items-center">
							<div>
								<div className="font-semibold text-blue-700">{quiz.title}</div>
								<div className="text-sm text-gray-600">Category: {quiz.category} | Level: {quiz.level}</div>
								<div className="text-sm text-gray-600">Questions: {quiz.questions}</div>
							</div>
							<button
								onClick={() => handleDelete(quiz.id)}
								className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
							>Delete</button>
						</div>
					))
				)}
			</div>
		</div>
	);
}
