/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "guest",
    role: "guest",
  });
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({
      username: "guest",
      role: "guest",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
