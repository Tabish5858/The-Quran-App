import { useState, useEffect } from "react";

export function UseLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      // Parse stored json or if none return initialValue
      const value = item ? JSON.parse(item) : initialValue;

      // If we're setting theme, apply it immediately
      if (key === "theme") {
        document.body.dataset.theme = value;
        document.documentElement.className = value;
      }

      return value;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));

      // If we're setting theme, apply it immediately
      if (key === "theme") {
        document.body.dataset.theme = valueToStore;
        document.documentElement.className = valueToStore;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setValue];
}
