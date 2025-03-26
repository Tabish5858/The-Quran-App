import React, { useEffect, useState } from "react";
import LeftSection from "../../components/layouts/LeftSection";
import HomeScreen from "../../listenQuran/components/HOmeScreen";
import { UseLocalStorage } from "../../theme/UseLocalStorage";
import BookMark from "../bookmark/Bookmark";
import Home from "../home/Home";
import ReadQuran from "../read_quran/Read-Quran";

const Layouts = () => {
  const [surahToNavigate, setSurahToNavigate] = useState(null);
  const [ayatToNavigate, setAyatToNavigate] = useState(null);
  const [navigationPending, setNavigationPending] = useState(false);
  const [theme, setTheme] = UseLocalStorage("theme", "dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Apply theme to body as soon as component mounts
  useEffect(() => {
    document.body.dataset.theme = theme;
    document.documentElement.className = theme; // Apply to html element too for completeness
  }, [theme]);

  // Define menus with a function to ensure dynamic values are passed correctly
  const getMenus = () => [
    {
      name: "Home",
      page: <Home theme={theme} />,
    },
    {
      name: "Read Quran",
      page: (
        <ReadQuran
          key={`surah-${surahToNavigate}-ayat-${ayatToNavigate}-${Date.now()}`} // Add timestamp to force re-render
          navigateToSurah={surahToNavigate}
          navigateToAyat={ayatToNavigate}
          clearNavigation={() => {
            setSurahToNavigate(null);
            setAyatToNavigate(null);
            setNavigationPending(false);
          }}
          theme={theme}
        />
      ),
    },
    {
      name: "Listen Quran",
      page: <HomeScreen theme={theme} />,
    },
    {
      name: "BookMarks",
      page: null, // We'll set this dynamically below
    },
  ];

  const [menus, setMenus] = useState(getMenus());
  const [selectedPage, setSelectedPage] = useState(menus[0]);

  // Update menus when navigation params change or navigation is pending
  useEffect(() => {
    if (navigationPending) {
      setMenus(getMenus());
    }
  }, [surahToNavigate, ayatToNavigate, navigationPending, theme]);

  function onHandleClickMenu(menu) {
    setSelectedPage(menu);
    setIsMobileMenuOpen(false); // Close mobile menu when selecting a page
  }

  function navigateToBookmark(surah, ayat) {
    console.log(`Layout navigating to surah ${surah}, ayat ${ayat}`);

    // Set navigation pending flag
    setNavigationPending(true);

    // First navigate to Read Quran page
    const readQuranMenu = menus.find((menu) => menu.name === "Read Quran");
    if (readQuranMenu) {
      setSelectedPage(readQuranMenu);
    }

    // Then set up the navigation parameters after a short delay
    setTimeout(() => {
      // Set the navigation parameters
      setSurahToNavigate(parseInt(surah));
      setAyatToNavigate(parseInt(ayat));

      // Force menu update
      setMenus(getMenus());
    }, 100);
  }

  // Update the BookMarks menu item with the component that has access to onHandleClickMenu
  menus[3].page = (
    <BookMark
      onHandleClickMenu={onHandleClickMenu}
      menus={menus}
      navigateToBookmark={navigateToBookmark}
      theme={theme}
    />
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`h-screen w-full flex flex-col lg:flex-row ${theme}`}>
      {/* Mobile Header with Menu button - visible only on smaller screens */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-teal-700 text-white">
        <div className="flex items-center">
          <img src="/logo.png" alt="logo" className="w-8 h-8 mr-2" />
          <span className="font-bold text-lg">The Quran App</span>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Left Section - Full sidebar on desktop, slide-in menu on mobile */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } lg:block fixed lg:relative z-50 w-64 lg:w-auto lg:basis-1/5 h-screen`}
      >
        <LeftSection
          menus={menus}
          onHandleClickMenu={onHandleClickMenu}
          selectedPage={selectedPage}
          theme={theme}
        />
      </div>

      {/* Overlay to close mobile menu when clicking outside */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main content area - takes remaining space */}
      <div className={`h-full w-full overflow-auto ${theme} lg:basis-4/5`}>
        {selectedPage.page}
      </div>
    </div>
  );
};

export default Layouts;
