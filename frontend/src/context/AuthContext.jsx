import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const getStored = () => {
  try {
    return JSON.parse(localStorage.getItem("eh_auth"));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStored);

  useEffect(() => {
    if (auth) {
      localStorage.setItem("eh_auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("eh_auth");
    }
  }, [auth]);

  const login = (payload) => {
    const authData = {
      user: payload.user || payload,
      token: payload.token
    };
    setAuth(authData);
  };
  const logout = () => setAuth(null);

  return (
    <AuthContext.Provider value={{ ...auth, user: auth?.user || null, token: auth?.token || null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


