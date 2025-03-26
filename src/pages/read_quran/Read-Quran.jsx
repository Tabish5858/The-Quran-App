import React, { useEffect, useRef, useState } from "react";
import LeftSection from "../../components/read-quran/LeftSection";
import RightSection from "../../components/read-quran/RightSection";
import SkeletonLoader from "../../components/shared/SkeletonLoader";
import { QuranApi } from "../../services/quran_api";
import { UseLocalStorage } from "../../theme/UseLocalStorage";

const ReadQuran = ({ navigateToSurah, navigateToAyat, clearNavigation }) => {
  const [listSurah, setListSurah] = useState([]);
  const [detailSurah, setDetailSurah] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [theme, setTheme] = UseLocalStorage("theme", "dark");
  const [translation, setTranslation] = UseLocalStorage(
    "translation",
    "english"
  );
  const [showSurahList, setShowSurahList] = useState(false);

  // Keep track of the current surah number
  const [currentSurah, setCurrentSurah] = useState(null);
  const [transitionEffect, setTransitionEffect] = useState({
    opacity: 1,
    transform: "translateY(0)",
  });

  // Store reference to the ayat to scroll to
  const [targetAyat, setTargetAyat] = useState(null);

  // Flag to track first load
  const firstLoadRef = useRef(true);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    getSurah();
  }, []);

  // Load first surah by default when surah list is available
  useEffect(() => {
    if (listSurah.length > 0 && firstLoadRef.current && !navigateToSurah) {
      // Only load the first surah if we're not navigating from a bookmark
      getDetailSurah(1); // 1 is Al-Fatihah (the first surah)
      firstLoadRef.current = false;
    }
  }, [listSurah, navigateToSurah]);

  // Handle navigation from bookmark
  useEffect(() => {
    if (navigateToSurah && navigateToAyat && listSurah.length > 0) {
      setTargetAyat(navigateToAyat);
      getDetailSurah(navigateToSurah);
      firstLoadRef.current = false; // Mark first load as complete since we're loading a specific surah

      // Clear navigation params after handling them
      if (clearNavigation) clearNavigation();
    }
  }, [navigateToSurah, navigateToAyat, listSurah]);

  // When translation changes, refetch the current surah if any and add effect
  useEffect(() => {
    if (currentSurah) {
      // Start transition effect
      setTransitionEffect({
        opacity: 0,
        transform: "translateY(20px)",
      });

      // Fetch after a slight delay to allow animation
      const timer = setTimeout(() => {
        getDetailSurah(currentSurah);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [translation]);

  // Reset transition effect after loading is done
  useEffect(() => {
    if (!loadingDetail) {
      const timer = setTimeout(() => {
        setTransitionEffect({
          opacity: 1,
          transform: "translateY(0)",
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [loadingDetail]);

  async function getSurah() {
    try {
      const surah = await QuranApi.getSurah();
      if (surah) {
        setListSurah(surah);
      } else {
        console.error("Failed to fetch surah list");
      }
    } catch (error) {
      console.error("Error fetching surah list:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getDetailSurah(nomor) {
    setCurrentSurah(nomor);
    setLoadingDetail(true);
    setShowSurahList(false); // Hide surah list on mobile when selecting a surah
    try {
      const detail = await QuranApi.getDetailSurah(nomor, translation);
      if (detail) {
        setDetailSurah(detail);
      } else {
        console.error(`Failed to fetch details for surah ${nomor}`);
      }
    } catch (error) {
      console.error(`Error fetching details for surah ${nomor}:`, error);
    } finally {
      setLoadingDetail(false);
    }
  }

  const toggleSurahList = () => {
    setShowSurahList(!showSurahList);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
      {loading ? (
        <div className="flex flex-col md:flex-row w-full">
          {/* Skeleton for left section */}
          <div className="hidden md:block md:basis-1/4 lg:basis-1/4 border-r border-gray-200">
            <SkeletonLoader type="sidebarList" />
          </div>

          {/* Skeleton for right section */}
          <div className="basis-full md:basis-3/4 lg:basis-3/4">
            <SkeletonLoader type="content" />
          </div>
        </div>
      ) : (
        <>
          {/* Mobile Surah Selector Button - only visible on mobile */}
          <div className="md:hidden flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800">
            <h2 className="font-semibold text-lg">
              {detailSurah.nama_latin || "Select Surah"}
            </h2>
            <button
              onClick={toggleSurahList}
              className="px-4 py-1 bg-teal-700 text-white rounded-md flex items-center"
            >
              <span>{showSurahList ? "Hide" : "Show"} Surahs</span>
            </button>
          </div>

          {/* Left Section - hidden on mobile by default, shown when toggled */}
          <div
            className={`${
              showSurahList ? "block" : "hidden"
            } md:block fixed md:relative z-30 w-full md:w-auto md:basis-1/4 lg:basis-1/4 h-screen md:h-auto border-r border-gray-200 bg-white dark:bg-gray-900`}
          >
            <LeftSection
              listSurah={listSurah ?? []}
              getDetailSurah={getDetailSurah}
              theme={theme}
              translation={translation}
              currentSurah={currentSurah}
            />
          </div>

          {/* Overlay to close surah list when clicking outside on mobile */}
          {showSurahList && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={() => setShowSurahList(false)}
            ></div>
          )}

          {/* Right Section - always visible, takes full width on mobile */}
          <div
            className="basis-full md:basis-3/4 lg:basis-3/4 relative"
            style={{
              opacity: transitionEffect.opacity,
              transform: transitionEffect.transform,
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <RightSection
              detailSurah={detailSurah ?? []}
              loadingDetail={loadingDetail}
              theme={theme}
              translation={translation}
              setTranslation={setTranslation}
              targetAyat={targetAyat}
              clearTargetAyat={() => setTargetAyat(null)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ReadQuran;
