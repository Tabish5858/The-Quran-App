import React, { useState, useEffect } from "react";
import LeftSection from "../../components/layouts/LeftSection";
import ReadQuran from "../read_quran/Read-Quran";
import BookMark from "../bookmark/Bookmark";
import Home from "../home/Home";
import HomeScreen from "../../listenQuran/components/HOmeScreen";
import { UseLocalStorage } from "../../theme/UseLocalStorage";

const Layouts = () => {
  const [surahToNavigate, setSurahToNavigate] = useState(null);
  const [ayatToNavigate, setAyatToNavigate] = useState(null);
  const [navigationPending, setNavigationPending] = useState(false);
  const [theme, setTheme] = UseLocalStorage("theme", "dark");

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

  return (
    <div className={`h-screen w-full flex ${theme}`}>
      <LeftSection
        menus={menus}
        onHandleClickMenu={onHandleClickMenu}
        selectedPage={selectedPage}
        theme={theme}
      />

      <div className={`h-full w-full ${theme}`}>{selectedPage.page}</div>
    </div>
  );
};

export default Layouts;
