import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(localStorage.getItem("resumeai_role"));
  const [name, setName] = useState(localStorage.getItem("resumeai_name"));

  function login(data) {
    localStorage.setItem("resumeai_token", data.access_token);
    localStorage.setItem("resumeai_role", data.role);
    localStorage.setItem("resumeai_name", data.name);
    setRole(data.role);
    setName(data.name);
  }

  function logout() {
    localStorage.removeItem("resumeai_token");
    localStorage.removeItem("resumeai_role");
    localStorage.removeItem("resumeai_name");
    setRole(null);
    setName(null);
  }

  const value = useMemo(() => ({ role, name, login, logout }), [role, name]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
