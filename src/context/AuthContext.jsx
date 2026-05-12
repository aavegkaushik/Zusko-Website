import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

// useEffect(() => {
//   const storedToken = localStorage.getItem("token");
//   const storedUser = localStorage.getItem("user");

//   if (storedToken && storedUser) {
//     setToken(storedToken);
//     setUser(JSON.parse(storedUser));
//   }
// }, []);

const login = (userData, jwtToken) => {
  setUser(userData);
  setToken(jwtToken);

  localStorage.setItem("token", jwtToken);
  localStorage.setItem("user", JSON.stringify(userData));
};

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};