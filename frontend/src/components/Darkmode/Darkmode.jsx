import React, { useState, useEffect } from "react";

const Darkmode= () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);

    // Apply the dark mode class to the body
    document.documentElement.classList.toggle("dark", savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Dark Mode Example</h1>
        <p className="mt-2">Click the button to toggle dark mode.</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition-all duration-300"
          onClick={toggleDarkMode}
        >
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
};

export default Darkmode;
