import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { UseLocalStorage } from "../../theme/UseLocalStorage";
import ChapterScreen from "./ChapterScreen";
import PlayerScreen from "./PlayerScreen";
import RecitersScreen from "./RecitersScreen";

const HomeScreen = () => {
  const [reciters, setReciters] = useState([]);
  const [chapters, setChapters] = useState([]);

  const [loading, setloading] = useState(true);

  const [chapterDetail, setChapterDetail] = useState(null);
  const [reciterDetail, setReciterDetail] = useState(null);
  const [theme, setTheme] = UseLocalStorage("theme", "dark");

  // States for mobile views
  const [activeView, setActiveView] = useState("reciters");
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Get All Reciters with Audio
  useEffect(() => {
    async function fetchData() {
      const {
        data: { reciters },
      } = await axios.get(`https://mp3quran.net/api/_english.php`);

      setReciters(reciters);
      setloading(false);
    }

    fetchData();
  }, []);

  // Get All Chapters
  useEffect(() => {
    async function fetchData() {
      const {
        data: { chapters },
      } = await axios.get(`https://api.quran.com/api/v4/chapters`);

      setChapters(chapters);
      setloading(false);
    }
    reciters && reciters.length > 0 && fetchData();
  }, [reciters]);

  const reciterHandler = (reciter) => {
    console.log("Selected reciter: ", reciter);
    setReciterDetail(reciter);

    // On mobile, automatically switch to the chapters view after selecting a reciter
    if (window.innerWidth < 768) {
      setActiveView("chapters");
    }
  };

  const chapterHandler = (chapter) => {
    console.log("Selected chapter: ", chapter);
    setChapterDetail(chapter);

    // On mobile, automatically switch to the player view after selecting a chapter
    if (window.innerWidth < 768) {
      setActiveView("player");
    }
  };

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };

  const renderMobileNavigation = () => {
    return (
      <div className="md:hidden w-full bg-teal-700 p-2 text-white flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="logo" className="w-7 h-7 mr-2" />
          <span>Listen Quran</span>
        </div>
        <button
          onClick={toggleMobileNav}
          className="px-3 py-1 rounded-md bg-teal-800 text-white text-sm"
        >
          Menu
        </button>
      </div>
    );
  };

  const renderMobileMenu = () => {
    if (!showMobileNav) return null;

    return (
      <div
        className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
        onClick={() => setShowMobileNav(false)}
      >
        <div
          className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-800 p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Navigation</h3>
            <button onClick={() => setShowMobileNav(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left p-2 rounded-md ${
                  activeView === "reciters"
                    ? "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-400"
                    : ""
                }`}
                onClick={() => {
                  setActiveView("reciters");
                  setShowMobileNav(false);
                }}
              >
                Reciters
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded-md ${
                  activeView === "chapters"
                    ? "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-400"
                    : ""
                }`}
                onClick={() => {
                  setActiveView("chapters");
                  setShowMobileNav(false);
                }}
                disabled={!reciterDetail}
              >
                Chapters{" "}
                {!reciterDetail && (
                  <span className="text-xs text-gray-500">
                    (Select a reciter first)
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded-md ${
                  activeView === "player"
                    ? "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-400"
                    : ""
                }`}
                onClick={() => {
                  setActiveView("player");
                  setShowMobileNav(false);
                }}
                disabled={!chapterDetail}
              >
                Player{" "}
                {!chapterDetail && (
                  <span className="text-xs text-gray-500">
                    (Select a chapter first)
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className={`h-screen flex flex-col md:flex-row w-full ${theme}`}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Mobile Navigation */}
          {renderMobileNavigation()}
          {renderMobileMenu()}

          {/* Desktop Layout - row, Mobile Layout - stack with conditional display */}
          <div
            className={`${
              activeView === "reciters" ? "block" : "hidden"
            } md:block md:w-1/3`}
          >
            <RecitersScreen
              reciters={reciters}
              reciterHandler={reciterHandler}
            />
          </div>
          <div
            className={`${
              activeView === "chapters" ? "block" : "hidden"
            } md:block md:w-1/3`}
          >
            <ChapterScreen
              chapters={chapters}
              chapterHandler={chapterHandler}
            />
          </div>
          <div
            className={`${
              activeView === "player" ? "block" : "hidden"
            } md:block md:w-1/3`}
          >
            <PlayerScreen
              reciterDetail={reciterDetail}
              chapterDetail={chapterDetail}
              theme={theme}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
