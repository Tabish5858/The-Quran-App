import React, { useState, useEffect, useRef } from "react";
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
  targetAyat,
  clearTargetAyat,
}) => {
  const [onBookmark, setOnBookMark] = useState({});
  const [fontSize, setFontSize] = UseLocalStorage("fontSize", 16);
  const [translationEffects, setTranslationEffects] = useState({
    opacity: 1,
    transform: "translateY(0)",
  });
  const contentRef = useRef(null);
  const ayatRefs = useRef({});
  const scrollAttemptRef = useRef(0); // Track scroll attempts

  // Update the setBookmark function to ensure we're storing all required properties
  function setBookmark(value) {
    const bookmark = Utils.getBookmark();

    if (bookmark && bookmark["id"] === value.id) {
      setOnBookMark({});
      return Utils.removeBookmark();
    }

    // Make sure we have surah number in the bookmark
    const bookmarkData = {
      ...value,
      namaSurah: detailSurah.nama_latin,
      // Ensure these critical fields are set properly
      surah: value.surah || detailSurah.nomor, // Use detailSurah.nomor instead of currentSurah
    };

    // Log what we're storing
    console.log("Storing bookmark:", bookmarkData);

    Utils.setBookmark(bookmarkData);
    setOnBookMark(bookmarkData);
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

  // Load bookmarks
  useEffect(() => {
    const bookmark = Utils.getBookmark();
    if (bookmark) {
      setOnBookMark(bookmark);
    }
  }, []);

  // Scroll to target ayat if specified
  useEffect(() => {
    if (!loadingDetail && targetAyat && detailSurah.ayat) {
      console.log(`Attempting to scroll to ayat ${targetAyat}`);

      // Reset scroll attempt counter when new target is set
      if (scrollAttemptRef.current === 0) {
        scrollAttemptRef.current = 3; // Allow up to 3 attempts
      }

      const attemptScroll = () => {
        if (ayatRefs.current[targetAyat]) {
          console.log(`Found ayat ${targetAyat} ref, scrolling`);

          ayatRefs.current[targetAyat].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Add a highlight effect to the target ayat
          const element = ayatRefs.current[targetAyat];
          element.classList.add("bg-teal-50", "dark:bg-teal-900/30");

          setTimeout(() => {
            element.classList.remove("bg-teal-50", "dark:bg-teal-900/30");
          }, 2000);

          // Reset counter and clear target
          scrollAttemptRef.current = 0;
          clearTargetAyat();
          return true;
        }

        return false;
      };

      // Try to scroll immediately
      if (!attemptScroll()) {
        // If immediate scroll fails, try with increasing delays
        const timer1 = setTimeout(() => {
          if (!attemptScroll() && scrollAttemptRef.current > 0) {
            scrollAttemptRef.current--;

            const timer2 = setTimeout(() => {
              if (!attemptScroll() && scrollAttemptRef.current > 0) {
                scrollAttemptRef.current--;

                const timer3 = setTimeout(() => {
                  if (!attemptScroll()) {
                    // Give up after all attempts
                    console.log("Failed to scroll after multiple attempts");
                    scrollAttemptRef.current = 0;
                    clearTargetAyat();
                  }
                }, 1000);

                return () => clearTimeout(timer3);
              }
            }, 500);

            return () => clearTimeout(timer2);
          }
        }, 200);

        return () => clearTimeout(timer1);
      }
    }
  }, [loadingDetail, targetAyat, detailSurah]);

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
            ref={contentRef}
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
                  <div
                    key={index}
                    ref={(el) => (ayatRefs.current[data.nomor] = el)}
                    className={`transition-colors duration-500 ${
                      targetAyat === data.nomor ? "scroll-mt-24" : ""
                    }`}
                    id={`ayat-${data.nomor}`}
                  >
                    <ItemAyat
                      data={{
                        ...data,
                        surah: detailSurah.nomor,
                        // Add an explicit showAyatNumber flag
                        showAyatNumber: false,
                      }}
                      setBookmark={setBookmark}
                      onBookmark={onBookmark}
                      showIconBookmark={true}
                      theme={theme}
                      fontSize={fontSize}
                      translation={translation}
                      // Pass an explicit display configuration
                      displayConfig={{
                        showAyatNumber: false, // Don't show ayat number in text
                        showRightAyatNumber: true, // Show ayat number on right side
                      }}
                    />
                  </div>
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
