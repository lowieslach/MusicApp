import { useState, createContext, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { authApi } from "../js/api/auth.js";

//https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx

let AuthContext = createContext(null);

export function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  let signin = (newUser, callback) => {
    return authApi.signin(newUser, () => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return authApi.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
