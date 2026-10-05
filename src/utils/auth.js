/**
 * Utility functions for client-side JWT token validation and storage management.
 */

/**
 * Checks whether a JWT token is expired or invalid.
 * @param {string|null} token
 * @returns {boolean} True if the token is null, invalid, or expired.
 */
export const isTokenExpired = (token) => {
  if (!token || typeof token !== "string") {
    return true;
  }

  try {
    const parts = token.trim().split(".");
    if (parts.length !== 3) {
      // If it's not a standard 3-part JWT, cannot inspect client-side
      return false;
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );

    const jsonPayload = decodeURIComponent(
      Array.prototype.map
        .call(atob(padded), (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const payload = JSON.parse(jsonPayload);

    if (payload && typeof payload.exp === "number") {
      const expiryMs = payload.exp * 1000;
      // Buffer of 5 seconds to prevent race conditions during network requests
      return Date.now() >= expiryMs - 5000;
    }

    return false;
  } catch (err) {
    console.warn("Unable to parse JWT token:", err);
    return true;
  }
};

/**
 * Gets the token from localStorage if it exists and is not expired.
 * If expired, cleans up stale auth data from localStorage.
 */
export const getStoredToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    if (isTokenExpired(token)) {
      clearAuthStorage();
      return null;
    }

    return token;
  } catch {
    return null;
  }
};

/**
 * Gets the saved user from localStorage only if the token is also valid.
 */
export const getStoredUser = () => {
  try {
    const token = getStoredToken();
    if (!token) return null;

    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
};

/**
 * Clears auth credentials from localStorage.
 */
export const clearAuthStorage = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (err) {
    console.error("Failed to clear auth storage:", err);
  }
};
