import { createContext, useContext, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const authorizeToken = `Bearer ${token}`;
  const [user, setUser] = useState(null);
  const [alluser, setAllUser] = useState([]);
  const [author, setAuthor] = useState(null);
  const apiUrl_REFRESHTOKEN = `${import.meta.env.VITE_API_BASE_URL}${
    import.meta.env.VITE_REFRESH_TOKEN
  } `;
  const apiUrl_USER = `${import.meta.env.VITE_API_BASE_URL}${
    import.meta.env.VITE_USER_DATA
  } `;

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

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(apiUrl_REFRESHTOKEN, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.accessToken) {
          storeTokenInLS(data.accessToken);
          return data.accessToken;
        } else {
          logout();
        }
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  };

  const fetchWithAuth = async ({ url, Option }) => {
    let resp = await fetch(url, {
      ...Option,
      headers: {
        ...Option.headers,
        Authorization: authorizeToken,
      },
    });
    if (resp.status === 401) {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        resp = await fetch(url, {
          ...Option,
          headers: {
            ...Option.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      }
    }
    return resp;
  };

  const userAuthentication = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl_USER, {
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
            fetchWithAuth,
            alluser,
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
