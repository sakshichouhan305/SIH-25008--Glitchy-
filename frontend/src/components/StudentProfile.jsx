import React from "react";

// Example avatar image (replace with dynamic or actual image as needed)
import avatar from "../assets/img1.jpg";

export default function StudentProfile({
	name = "Aarav Sharma",
	className = "10th Grade",
	preparednessScore = 85,
	modulesCompleted = 15,
	totalModules = 18,
	scheduledDrills = 6,
	liveAlerts = 2,
	avatarUrl = avatar,
}) {
	return (
		<div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-gray-100">
			<div className="flex items-center gap-6 mb-6">
				<img
					src={avatarUrl}
					alt="Student Avatar"
					className="w-20 h-20 rounded-full border-4 border-blue-200 object-cover shadow"
				/>
				<div>
					<h2 className="text-2xl font-bold text-gray-900">{name}</h2>
					<p className="text-gray-600 text-sm font-medium">{className}</p>
				</div>
			</div>
			<div className="mb-6">
				<div className="flex items-center justify-between mb-2">
					<span className="text-sm text-gray-600 font-medium">Preparedness Score</span>
					<span className="text-lg font-bold text-blue-600">{preparednessScore}%</span>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-2">
					<div
						className="bg-blue-500 h-2 rounded-full transition-all duration-300"
						style={{ width: `${preparednessScore}%` }}
					></div>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4 text-center mb-6">
				<div className="p-2 bg-blue-50 rounded-lg">
					<div className="text-xl font-extrabold text-gray-900">{modulesCompleted}</div>
					<div className="text-xs text-gray-600">Modules Completed</div>
				</div>
				<div className="p-2 bg-green-50 rounded-lg">
					<div className="text-xl font-extrabold text-gray-900">{scheduledDrills}</div>
					<div className="text-xs text-gray-600">Scheduled Drills</div>
				</div>
				<div className="p-2 bg-red-50 rounded-lg">
					<div className="text-xl font-extrabold text-gray-900">{liveAlerts}</div>
					<div className="text-xs text-gray-600">Live Alerts</div>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<span className="text-sm text-gray-500">Progress: {modulesCompleted} / {totalModules} modules</span>
				<div className="w-full bg-gray-200 rounded-full h-2">
					<div
						className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
						style={{ width: `${Math.round((modulesCompleted / totalModules) * 100)}%` }}
					></div>
				</div>
			</div>
		</div>
	);
}
