import React, { useEffect, useState } from "react";
import { UseLocalStorage } from "../../theme/UseLocalStorage";

function HeaderSection({
  namaSurah,
  fontSize,
  setFontSize,
  translation,
  setTranslation,
}) {
  const [theme, setTheme] = UseLocalStorage("theme", "dark");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Available translations
  const translations = [
    { value: "english", label: "English" },
    { value: "urdu", label: "Urdu" },
  ];

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.body.dataset.fontSize = fontSize;
  }, [fontSize]);

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const handleFontIncrease = () => {
    setFontSize((prevFontSize) => prevFontSize + 1);
  };

  const handleFontDecrease = () => {
    setFontSize((prevFontSize) => prevFontSize - 1);
  };

  const handleTranslationSelect = (value) => {
    setTranslation(value);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Find the currently selected translation's label
  const currentTranslation =
    translations.find((t) => t.value === translation)?.label || "Select";

  return (
    <div
      className={`min-h-[64px] md:h-[84px] w-full flex flex-wrap md:flex-nowrap justify-between items-center px-3 sm:px-4 md:px-8 py-2 md:py-0 border-b border-gray-200 ${theme}`}
    >
      <div className="flex flex-col">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-700">
          {namaSurah}
        </h3>

        {/* Custom dropdown */}
        <div className="relative mt-1">
          <button
            onClick={toggleDropdown}
            className={`flex items-center justify-between w-28 md:w-36 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium border border-teal-700 rounded-md ${theme} hover:bg-teal-50 dark:hover:bg-teal-900 focus:outline-none`}
            type="button"
          >
            <span>{currentTranslation}</span>
            <svg
              className={`w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              className={`absolute z-10 w-28 md:w-36 mt-1 origin-top-right bg-white dark:bg-gray-800 border border-teal-700 rounded-md shadow-lg ${theme}`}
            >
              <div className="py-1">
                {translations.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleTranslationSelect(option.value)}
                    className={`block w-full px-2 md:px-4 py-1 md:py-2 text-left text-xs md:text-sm hover:bg-teal-100 dark:hover:bg-teal-900 ${
                      translation === option.value
                        ? "bg-teal-50 dark:bg-teal-900 text-teal-700"
                        : ""
                    } ${theme}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-around flex-row items-center space-x-3 md:space-x-4 md:w-40 mt-2 md:mt-0">
        <img
          src="font+.png"
          alt="font+"
          height={24}
          width={24}
          className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleFontIncrease}
        />
        <img
          src="font-.png"
          alt="font-"
          height={24}
          width={24}
          className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleFontDecrease}
        />
        <img
          src={theme === "dark" ? "sun.png" : "moon.png"}
          alt={theme === "dark" ? "moon" : "sun"}
          height={24}
          width={24}
          className="w-6 h-6 md:w-8 md:h-8 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleToggleTheme}
        />
      </div>
    </div>
  );
}

export default HeaderSection;
