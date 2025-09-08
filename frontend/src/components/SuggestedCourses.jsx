import React from "react";
import { BookOpenIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { dummyCourses } from "../data/dummyData";

const SuggestedCourses = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
          <BookOpenIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Suggested Courses
          </h3>
          <p className="text-sm text-gray-400">Boost your skills</p>
        </div>
      </div>

      <div className="space-y-4">
        {dummyCourses.slice(0, 3).map((course) => (
          <div
            key={course.id}
            className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-medium text-white line-clamp-2">
                {course.title}
              </h4>
              <span className="text-xs text-gray-400 ml-2">{course.price}</span>
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarSolidIcon
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(course.rating)
                        ? "text-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                {course.rating} ({course.students.toLocaleString()})
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{course.provider}</span>
              <span>{course.duration}</span>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              {course.skills.slice(0, 2).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded"
                >
                  {skill}
                </span>
              ))}
              {course.skills.length > 2 && (
                <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                  +{course.skills.length - 2}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 px-4 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors text-sm">
        View All Courses
      </button>
    </div>
  );
};

export default SuggestedCourses;
