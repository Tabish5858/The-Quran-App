import React, { useState, useEffect } from "react";
import HeaderSection from "./HeaderSection";
import ItemAyat from "../shared/ItemAyat";
import { Utils } from "../../utils";
import { UseLocalStorage } from "../../theme/UseLocalStorage";
import SkeletonLoader from "../shared/SkeletonLoader";

const RightSection = ({
  detailSurah,
  loadingDetail,
  theme,
  translation,
  setTranslation,
}) => {
  const [onBookmark, setOnBookMark] = useState({});
  const [fontSize, setFontSize] = UseLocalStorage("fontSize", 16);
  const [translationEffects, setTranslationEffects] = useState({
    opacity: 1,
    transform: "translateY(0)",
  });

  function setBookmark(value) {
    const bookmark = Utils.getBookmark();

    if (bookmark && bookmark["id"] === value.id) {
      setOnBookMark({});
      return Utils.removeBookmark();
    }

    Utils.setBookmark({ ...value, namaSurah: detailSurah.nama_latin });
    setOnBookMark({ ...value, namaSurah: detailSurah.nama_latin });
  }

  // Apply transition effect when translation changes
  useEffect(() => {
    setTranslationEffects({
      opacity: 0,
      transform: "translateY(20px)",
    });

    const timer = setTimeout(() => {
      setTranslationEffects({
        opacity: 1,
        transform: "translateY(0)",
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [translation]);

  useEffect(() => {
    const bookmark = Utils.getBookmark();
    if (bookmark) {
      setOnBookMark(bookmark);
    }
  }, []);

  function isNotEmpty() {
    return Object.keys(detailSurah).length > 0;
  }

  // If loading, show skeleton loader instead of the Home component
  if (loadingDetail) {
    return (
      <div className={`bg-white basis-3/4 flex-col h-screen ${theme}`}>
        <SkeletonLoader type="content" count={3} />
      </div>
    );
  }

  return (
    <div className={`bg-white basis-3/4 flex flex-col h-screen ${theme}`}>
      {isNotEmpty() ? (
        <>
          <HeaderSection
            fontSize={fontSize}
            setFontSize={setFontSize}
            theme={theme}
            namaSurah={detailSurah.nama_latin}
            translation={translation}
            setTranslation={setTranslation}
          />
          <div
            className={`flex-grow overflow-y-auto ${theme}`}
            style={{
              scrollBehavior: "smooth",
              height: "calc(100vh - 84px)", // Subtract header height (84px)
            }}
          >
            <div
              style={{
                opacity: translationEffects.opacity,
                transform: translationEffects.transform,
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              {detailSurah.ayat &&
                detailSurah.ayat.map((data, index) => (
                  <ItemAyat
                    key={index}
                    data={data}
                    setBookmark={setBookmark}
                    onBookmark={onBookmark}
                    showIconBookmark={true}
                    theme={theme}
                    fontSize={fontSize}
                    translation={translation}
                  />
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <div className="text-center">
            <img src="logo.png" alt="logo" className="mx-auto w-20 h-20 mb-4" />
            <h3 className="text-2xl font-medium text-teal-700">
              Select a Surah to begin reading
            </h3>
            <p className="text-gray-500 mt-2">
              Choose from the list on the left
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSection;
