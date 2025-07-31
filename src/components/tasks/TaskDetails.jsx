import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ApplicationForm from "../applications/ApplicationForm";
import ApplicationList from "../applications/ApplicationList";
import { getTaskDetails, getTaskApplications } from "../../api/tasks";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = React.useState(null);
  const [applications, setApplications] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await getTaskDetails(id);
        setTask(taskData);

        if (user?.role === "contributor" && taskData.createdBy === user._id) {
          const apps = await getTaskApplications(id);
          setApplications(apps);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load task details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    );
  }

  if (!task) {
    return <div className="text-center py-8">Task not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
        <p className="text-gray-600 mb-4">
          Posted by: {task.createdBy?.name || "Unknown"} •{" "}
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
        <div className="bg-gray-50 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{task.description}</p>
        </div>
      </div>

      {user?.role === "volunteer" && <ApplicationForm taskId={id} />}

      {user?.role === "contributor" && task.createdBy === user._id && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Applications</h2>
          <ApplicationList applications={applications} />
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
