
/**
 * Stores the JWT token in localStorage
 * @param {string} token - The JWT token to store
 */
export const setToken = (token) => {
  localStorage.setItem("workboard_token", token);
};

/**
 * Retrieves the JWT token from localStorage
 * @returns {string|null} The JWT token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem("workboard_token");
};

/**
 * Removes the JWT token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem("workboard_token");
};

/**
 * Checks if a valid token exists
 * @returns {boolean} True if token exists and is not expired
 */
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = decodeToken(token);
    return decoded.exp > Date.now() / 1000;
  } catch (error) {
    console.log(error);
    
  }
};

/**
 * Decodes a JWT token without verification
 * @param {string} token - The JWT token to decode
 * @returns {object} Decoded token payload
 */
export const decodeToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
};

/**
 * Gets the current user's role from the token
 * @returns {string|null} The user's role or null if not available
 */
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = decodeToken(token);
    return decoded.role || null;
  } catch (error) {
    console.log(error);

    return null;
  }
};

/**
 * Gets the current user's ID from the token
 * @returns {string|null} The user's ID or null if not available
 */
export const getUserId = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = decodeToken(token);
    return decoded.userId || decoded.sub || null;
  } catch (error) {
    
    console.log(error);
    
    return null;
  }
};

/**
 * Checks if the current user has a specific role
 * @param {string} role - The role to check against
 * @returns {boolean} True if the user has the specified role
 */
export const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

/**
 * Clears all authentication-related data
 */
export const clearAuth = () => {
  removeToken();
};
