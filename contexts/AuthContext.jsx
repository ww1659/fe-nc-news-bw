/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { loginUser } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    username: "guest",
    avatar: "",
    role: "guest",
  });

  const login = (userInput) => {
    return loginUser(userInput).then((response) => {
      const user = response.user;
      if (response.status === 200 && user.valid) {
        setUser({
          name: user.user[0].name,
          username: user.user[0].username,
          avatar: user.user[0].avatar_url,
          role: "user",
        });
        return Promise.resolve({
          status: response.status,
          msg: "Login Successful",
        });
      } else {
        return Promise.reject({
          status: response.status,
          msg: response.msg,
        });
      }
    });
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
