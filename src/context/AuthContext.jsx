import {
  createContext,
  useContext,
  useState,
} from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  function login(credentials) {
    const result = loginUser(credentials);

    if (result.success) {
      setUser(result.user);
    }

    return result;
  }

  function register(details) {
    const result = registerUser(details);

    if (result.success) {
      setUser(result.user);
    }

    return result;
  }

  function logout() {
    const success = logoutUser();

    if (success) {
      setUser(null);
    }

    return success;
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: Boolean(user), login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}