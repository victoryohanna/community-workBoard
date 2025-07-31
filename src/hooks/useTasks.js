import { useEffect, useState } from "react";
import { getTasks, getMyTasks } from "../api/tasks";

export const useTasks = (type = "all") => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = type === "my" ? await getMyTasks() : await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [type]);

  const refetch = async () => {
    setLoading(true);
    try {
      const data = type === "my" ? await getMyTasks() : await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    refetch,
    setTasks,
  };
};
