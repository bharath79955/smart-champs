import { getStoredData, setStoredData } from "./storage";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "current-user";

export function getCurrentUser() {
  return getStoredData(CURRENT_USER_KEY, null);
}

export function registerUser({ name, email, password }) {
  const users = getStoredData(USERS_KEY, []);
  const normalizedEmail = email.trim().toLowerCase();

  if (!Array.isArray(users)) {
    return { success: false, message: "Unable to access accounts." };
  }

  if (users.some((user) => user.email === normalizedEmail)) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const user = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
  };

  if (!setStoredData(USERS_KEY, [...users, user])) {
    return {
      success: false,
      message: "Unable to save your account. Please try again.",
    };
  }

  const publicUser = { id: user.id, name: user.name, email: user.email };

  if (!setStoredData(CURRENT_USER_KEY, publicUser)) {
    return {
      success: false,
      message: "Account created, but login could not be saved.",
    };
  }

  return { success: true, user: publicUser };
}

export function loginUser({ email, password }) {
  const users = getStoredData(USERS_KEY, []);
  const normalizedEmail = email.trim().toLowerCase();

  if (!Array.isArray(users)) {
    return { success: false, message: "Unable to access accounts." };
  }

  const user = users.find(
    (item) =>
      item.email === normalizedEmail && item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  const publicUser = { id: user.id, name: user.name, email: user.email };

  if (!setStoredData(CURRENT_USER_KEY, publicUser)) {
    return {
      success: false,
      message: "Unable to save your login. Please try again.",
    };
  }

  return { success: true, user: publicUser };
}

export function logoutUser() {
  try {
    localStorage.removeItem("smart-champs-current-user");
    return true;
  } catch {
    return false;
  }
}