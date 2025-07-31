import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const TaskItem = ({ task, showActions }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{task.title}</h3>
          <p className="text-gray-600 text-sm">
            {task.createdBy?.name && `Posted by: ${task.createdBy.name} • `}
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        {showActions && (
          <div className="flex space-x-2">
            {user?.role === "volunteer" && (
              <Link
                to={`/tasks/${task._id}`}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium"
              >
                Apply
              </Link>
            )}
            {user?.role === "contributor" &&
              user._id === task.createdBy?._id && (
                <Link
                  to={`/tasks/${task._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium"
                >
                  View Apps
                </Link>
              )}
          </div>
        )}
      </div>
      <p className="mt-2 text-gray-700">{task.description}</p>
    </div>
  );
};

export default TaskItem;
