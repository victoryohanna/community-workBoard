// src/api/auth.js
import axios from "axios";


const API_BASE_URL = "http://localhost:3000/api";
// Named export for login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error.response?.data?.message || "Login failed";
  }
};

// Named export for register
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error.response?.data?.message || "Registration failed";
  }
};

// If you were using default export before, remove it
// export default { loginUser, registerUser }; // ← Remove this line if present
