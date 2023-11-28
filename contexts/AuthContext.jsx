/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { fetchUserByUsername, loginUser } from "../utils/api";

const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : null;
};

const clearCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    username: "guest",
    avatar: "",
    role: "guest",
  });

  useEffect(() => {
    checkUserStatus();
  }, []);

  const login = (userInput) => {
    return loginUser(userInput).then((response) => {
      const user = response.user;
      if (response.status === 200 && user.valid) {
        setCookie("userId", user.user[0].username, 1);
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
    clearCookie("userId");
  };

  const checkUserStatus = () => {
    const userId = getCookie("userId");

    if (userId) {
      return fetchUserByUsername(userId).then((response) => {
        const userData = response[0];

        setUser({
          name: userData.name,
          username: userData.username,
          avatar: userData.avatar_url,
          role: "user",
        });
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
