import React, { useEffect, useState } from "react";
import SkeletonLoader from "../shared/SkeletonLoader";
import InputSearch from "./InputSearch";
import LisstSurah from "./LisstSurah";

const LeftSection = ({
  listSurah,
  getDetailSurah,
  theme,
  translation,
  currentSurah,
}) => {
  const [search, setSearch] = useState("");
  const [listSurahBaru, setListSurahBaru] = useState([]);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search Surah");
  const [transitionEffect, setTransitionEffect] = useState({
    opacity: 1,
    transform: "translateX(0)",
  });

  // Update search placeholder based on selected language
  useEffect(() => {
    // Apply transition effect
    setTransitionEffect({
      opacity: 0,
      transform: "translateX(-10px)",
    });

    if (translation === "english") {
      setSearchPlaceholder("Search Surah");
    } else if (translation === "urdu") {
      setSearchPlaceholder("سورہ تلاش کریں");
    } else {
      setSearchPlaceholder("Search Surah");
    }

    // Reset transition effect
    const timer = setTimeout(() => {
      setTransitionEffect({
        opacity: 1,
        transform: "translateX(0)",
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [translation]);

  function onChangeHandler(e) {
    e.preventDefault();
    setSearch(e.target.value);

    // Improve search to work with any length
    if (e.target.value.length > 0) {
      const listSurahTemp = listSurah.filter((surah) =>
        surah.nama_latin.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setListSurahBaru(listSurahTemp);
    } else {
      setListSurahBaru([]);
    }
  }

  return (
    <div
      className={`bg-white w-full flex flex-col border-r border-gray-200 ${theme}`}
      style={{
        transition: "all 0.3s ease",
        height: "100%", // Use 100% instead of 100vh to fit parent container
      }}
    >
      <div
        className="flex flex-col h-full"
        style={{
          opacity: transitionEffect.opacity,
          transform: transitionEffect.transform,
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <div className="p-2 md:p-4">
          <InputSearch
            value={search}
            onChange={onChangeHandler}
            theme={theme}
            placeholder={searchPlaceholder}
          />
        </div>

        <div className="overflow-y-auto flex-grow">
          {listSurah.length > 0 ? (
            <LisstSurah
              listSurah={search.length > 0 ? listSurahBaru : listSurah}
              getDetailSurah={getDetailSurah}
              theme={theme}
              currentSurah={currentSurah}
            />
          ) : (
            <div className="h-full w-full p-4 md:p-8">
              <SkeletonLoader type="sidebarList" count={5} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSection;
