const PREFIX = "smart-champs-";

export function getStoredData(key, fallback = []) {
  try {
    const value = localStorage.getItem(PREFIX + key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function setStoredData(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStoredData(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    // Storage may be unavailable in the browser.
  }
}