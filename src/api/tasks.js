import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL = "http://localhost:3000/api"; // Adjust based on your backend URL

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/tasks`, taskData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const getMyTasks = async () => {
  const response = await axios.get(`${API_URL}/my-posted-tasks`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const getTaskApplications = async (taskId) => {
  const response = await axios.get(`${API_URL}/tasks/${taskId}/applications`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const getTaskDetails = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching task details:", error);
    throw error.response?.data?.message || "Failed to fetch task details";
  }
};
