import React, { useState } from "react";
import { useEffect } from "react";
import ItemAyat from "../../components/shared/ItemAyat";
import { Utils } from "../../utils";
import { UseLocalStorage } from "../../theme/UseLocalStorage";

const BookMark = ({ onHandleClickMenu, menus, navigateToBookmark }) => {
  const [onBookmark, setOnBookmark] = useState({});
  const [theme, setTheme] = UseLocalStorage("theme", "dark");

  useEffect(() => {
    const bookmark = Utils.getBookmark();
    if (bookmark) {
      setOnBookmark(bookmark);
    }
  }, []);

  function removeBookmark() {
    setOnBookmark({});
    Utils.removeBookmark();
  }

  function navigateToAyat() {
    // Debug log to verify the bookmark data
    console.log("Navigating to bookmark:", onBookmark);

    // Use the navigateToBookmark function from props
    if (onBookmark && onBookmark.surah && onBookmark.nomor) {
      // Parse as integers to ensure proper type comparison
      const surahNumber = parseInt(onBookmark.surah);
      const ayatNumber = parseInt(onBookmark.nomor);

      console.log(`Navigating to surah ${surahNumber}, ayat ${ayatNumber}`);
      navigateToBookmark(surahNumber, ayatNumber);
    } else {
      console.error("Invalid bookmark data:", onBookmark);
    }
  }

  return Object.keys(onBookmark).length > 0 ? (
    <div className={`w-full h-full flex flex-col items-center ${theme}`}>
      <div className="max-w-2xl w-full px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img src="bookmark.png" alt="bookmark" className="w-8 h-8 mr-3" />
            <h2 className="text-3xl font-bold text-teal-700 dark:text-teal-500">
              Bookmarked Ayat
            </h2>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Surah {onBookmark.surah}, Ayat {onBookmark.nomor}
          </div>
        </div>

        {/* Surah name */}
        <div className="bg-teal-50 dark:bg-teal-900/30 rounded-lg p-4 mb-6 text-center">
          <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-400">
            {onBookmark.namaSurah}
          </h3>
        </div>

        {/* Ayat content card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div
            className="cursor-pointer transition-all hover:bg-teal-50 dark:hover:bg-teal-900/10"
            onClick={navigateToAyat}
          >
            <ItemAyat
              data={onBookmark}
              onBookmark={onBookmark}
              setBookmark={() => {}}
              theme={theme}
              fontSize={18}
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/40 border-t border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Tap to read in context
            </div>
            <div className="flex space-x-3">
              <button
                className="flex items-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors"
                onClick={navigateToAyat}
              >
                <span className="mr-2">Go to Ayat</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>
              <button
                className="flex items-center bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 p-2 rounded-md transition-colors"
                onClick={removeBookmark}
                title="Remove bookmark"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`w-full h-full flex flex-col justify-center items-center ${theme}`}
    >
      <div className="text-center max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <img
          src="bookmark.png"
          alt="bookmark"
          className="w-24 h-24 mx-auto mb-6 opacity-60"
        />
        <h3 className="text-3xl font-bold text-teal-700 dark:text-teal-500 mb-4">
          No Bookmarks Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          Mark your favorite ayat while reading the Quran to save them here for
          quick access.
        </p>
        <button
          onClick={() => {
            const readQuranMenu = menus.find(
              (menu) => menu.name === "Read Quran"
            );
            if (readQuranMenu) onHandleClickMenu(readQuranMenu);
          }}
          className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
        >
          Start Reading
        </button>
      </div>
    </div>
  );
};

export default BookMark;
