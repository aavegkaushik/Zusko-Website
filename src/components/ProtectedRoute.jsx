import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { isTokenExpired } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const { user, token, logout } = useContext(AuthContext);
  const location = useLocation();

  const isExpired = isTokenExpired(token);

  if (!user || !token || isExpired) {
    if (token && isExpired) {
      logout();
    }

    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  return children;
}