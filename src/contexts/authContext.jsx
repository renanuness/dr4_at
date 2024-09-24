import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("@user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const login = (userData) => {
    axios.post("https://api-infnet-produtos-privado.vercel.app/auth", userData)
    .then(res =>  {
      setUser(res.data);
      localStorage.setItem("@user", JSON.stringify(res.data));
      navigate("/products");
    })
    .catch(er=>{
      toast.error("Erro na autenticação");
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("@user");
    navigate("/login");
  };

  const getUserInfo = () => {
    if (user) {
      const { email, password } = user;
      return { email, password };
    }
    return { email: "", password: "" };
  };

  const updateUserInfo = (userData) => {
    setUser(userData);
    localStorage.setItem("@user", JSON.stringify(userData));
    fetch("https://dummyjson.com/users/2", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData,
      }),
    })
      .then((res) => res.json())
      .catch((e) => toast.error("Erro ao atualizar os dados do usuário."));
  };

  const value = {
    user,
    login,
    logout,
    isLogged: !!user,
    getUserInfo,
    updateUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
