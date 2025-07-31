import { useState } from "react";
import { getTaskApplications } from "../api/tasks";

export const useTaskApplications = (taskId) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    if (!taskId) return;

    setLoading(true);
    try {
      const data = await getTaskApplications(taskId);
      setApplications(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  return {
    applications,
    loading,
    error,
    fetchApplications,
    setApplications,
  };
};
