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

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear authentication when browser/tab is closed
      localStorage.removeItem("eh_auth");
    };

    // Add event listener for browser/tab close
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

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


