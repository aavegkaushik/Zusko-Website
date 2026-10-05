import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import {
  getStoredToken,
  getStoredUser,
  clearAuthStorage,
  isTokenExpired,
} from "../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => getStoredUser());

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    clearAuthStorage();
    localStorage.removeItem("coupon");
  }, []);

  const login = useCallback((userData, newToken) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(newToken);
    setUser(userData);
  }, []);

  // Monitor token expiration on focus, periodic timer, and custom 401 events
  useEffect(() => {
    const verifyToken = () => {
      const activeToken = localStorage.getItem("token");
      if (activeToken && isTokenExpired(activeToken)) {
        console.warn("Auth token has expired. Logging out user.");
        logout();
        toast.error("Session expired. Please log in again.");
      }
    };

    verifyToken();

    const interval = setInterval(verifyToken, 15000);
    window.addEventListener("focus", verifyToken);

    const handleSessionExpired = () => {
      logout();
      toast.error("Session expired. Please log in again.");
    };

    window.addEventListener("auth:session-expired", handleSessionExpired);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", verifyToken);
      window.removeEventListener("auth:session-expired", handleSessionExpired);
    };
  }, [logout]);

  const isAuthenticated = Boolean(user && token && !isTokenExpired(token));

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};