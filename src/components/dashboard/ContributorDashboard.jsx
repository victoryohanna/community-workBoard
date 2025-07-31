import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyTasks } from "../../api/tasks";
import TaskForm from "../tasks/TaskForm";
import TaskList from "../tasks/TaskList";

const ContributorDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getMyTasks();
        setTasks(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Posted Tasks</h2>
      </div>

      <TaskForm onTaskCreated={handleTaskCreated} />

      {tasks.length > 0 ? (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{task.title}</h3>
                  <p className="text-gray-600 text-sm">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to={`/tasks/${task._id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Applications
                </Link>
              </div>
              <p className="mt-2 text-gray-700">{task.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">You haven't posted any tasks yet.</p>
        </div>
      )}
    </div>
  );
};

export default ContributorDashboard;
