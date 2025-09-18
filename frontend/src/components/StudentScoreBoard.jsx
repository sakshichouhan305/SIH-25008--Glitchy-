import React from "react";

// Example data (replace with real data as needed)
const studentScores = [
	{
		name: "Aarav Sharma",
		avatar: require("../assets/img1.jpg"),
		totalScore: 92,
		modules: [
			{ name: "Earthquake Prep", score: 95 },
			{ name: "Fire Safety", score: 90 },
			{ name: "Flood Response", score: 91 },
		],
	},
	{
		name: "Priya Singh",
		avatar: require("../assets/img2.jpg"),
		totalScore: 88,
		modules: [
			{ name: "Earthquake Prep", score: 90 },
			{ name: "Fire Safety", score: 85 },
			{ name: "Flood Response", score: 89 },
		],
	},
	{
		name: "Rohan Patel",
		avatar: require("../assets/img3.jpg"),
		totalScore: 80,
		modules: [
			{ name: "Earthquake Prep", score: 82 },
			{ name: "Fire Safety", score: 78 },
			{ name: "Flood Response", score: 80 },
		],
	},
];

export default function StudentScoreBoard() {
	return (
		<div className="max-w-3xl mx-auto py-10">
			<h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Student Scoreboard</h2>
			<div className="space-y-8">
				{studentScores.map((student, idx) => (
					<div key={idx} className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6 border border-gray-100">
						<img
							src={student.avatar}
							alt={student.name}
							className="w-16 h-16 rounded-full border-4 border-blue-200 object-cover shadow"
						/>
						<div className="flex-1">
							<h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
							<div className="mb-2">
								<span className="text-sm text-gray-600 font-medium">Total Score: </span>
								<span className="text-lg font-bold text-blue-600">{student.totalScore}</span>
							</div>
							<div className="mb-2">
								<span className="text-xs text-gray-500">Module Breakdown:</span>
								<ul className="mt-1 space-y-1">
									{student.modules.map((mod, i) => (
										<li key={i} className="flex justify-between text-sm text-gray-700">
											<span>{mod.name}</span>
											<span className="font-semibold text-blue-500">{mod.score}</span>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-2">
								<span className="text-xs text-gray-500">Progress:</span>
								<div className="w-full bg-gray-200 rounded-full h-2 mt-1">
									<div
										className="bg-blue-500 h-2 rounded-full transition-all duration-300"
										style={{ width: `${student.totalScore}%` }}
									></div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
