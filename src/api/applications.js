import axios from "axios";
import { getToken } from "../utils/auth";


const url ="http://localhost:3000/api";

/**
 * Apply to a task with a message
 * @param {string} taskId - ID of the task to apply to
 * @param {object} applicationData - Application data (contains message)
 * @returns {Promise<object>} The created application
 */
export const applyToTask = async (taskId, applicationData) => {
  try {
    const response = await axios.post(
      `${url}/tasks/${taskId}/apply`,
      applicationData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error applying to task:", error);
    throw error.response?.data?.message || "Failed to apply to task";
  }
};

/**
 * Get applications for a specific task (for contributors)
 * @param {string} taskId - ID of the task
 * @returns {Promise<Array>} List of applications
 */
export const getApplicationsForTask = async (taskId) => {
  try {
    const response = await axios.get(
      `${url}/tasks/${taskId}/applications`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error.response?.data?.message || "Failed to fetch applications";
  }
};

/**
 * Get all applications submitted by the current user (for volunteers)
 * @returns {Promise<Array>} List of user's applications
 */
export const getMyApplications = async () => {
  try {
    const response = await axios.get(`${url}/my-applications`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching my applications:", error);
    throw error.response?.data?.message || "Failed to fetch your applications";
  }
};

/**
 * Withdraw an application
 * @param {string} applicationId - ID of the application to withdraw
 * @returns {Promise<object>} Confirmation message
 */
export const withdrawApplication = async (applicationId) => {
  try {
    const response = await axios.delete(
      `${url}/applications/${applicationId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error withdrawing application:", error);
    throw error.response?.data?.message || "Failed to withdraw application";
  }
};

/**
 * Update an application (e.g., update message)
 * @param {string} applicationId - ID of the application to update
 * @param {object} updateData - New application data
 * @returns {Promise<object>} Updated application
 */
export const updateApplication = async (applicationId, updateData) => {
  try {
    const response = await axios.patch(
      `${url}/applications/${applicationId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating application:", error);
    throw error.response?.data?.message || "Failed to update application";
  }
};
