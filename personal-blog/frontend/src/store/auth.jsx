import { createContext, useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const authorizeToken = `Bearer ${token}`;
  const [user, setUser] = useState(null);
  const [author, setAuthor] = useState(null);

  let loggedIn = !!token;

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
  };

  const userAuthentication = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/getData", {
        method: "GET",
        headers: {
          Authorization: authorizeToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setAuthor(data.data._id);
        // console.log(data.data._id);
      } else {
        setUser(null);
        localStorage.removeItem("token");
        setToken("");
      }
    } catch (error) {
      console.log("Authentication error:", error);
      setUser(null);
      localStorage.removeItem("token");
      setToken("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      userAuthentication();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <AuthContext.Provider
          value={{
            user,
            storeTokenInLS,
            logout,
            loggedIn,
            authorizeToken,
            author,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
