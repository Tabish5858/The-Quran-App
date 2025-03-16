import React, { useState, useEffect } from "react";
import { QuranApi } from "../../services/quran_api";

const ItemAyat = ({
  data,
  setBookmark,
  onBookmark,
  showIconBookmark = false,
  theme,
  fontSize,
  translation = "english",
  displayConfig = {
    showAyatNumber: false,
    showRightAyatNumber: true,
  },
}) => {
  const [translatedText, setTranslatedText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debugging helper - log data on initial render
  useEffect(() => {
    // console.log("ItemAyat data:", data);
    // console.log("Current translation setting:", translation);
  }, []);

  // Get translation either from provided data or from translation API
  useEffect(() => {
    const getAndSetTranslation = async () => {
      // If we already have a proper translation from the API, use it
      if (
        data.translation &&
        data.translation !== "Translation not available"
      ) {
        setTranslatedText(data.translation);
        return;
      }

      // If basic translation is missing, try to get a fallback
      setIsLoading(true);
      try {
        // Try to get alternative translation first
        if (data.nomor && data.surah) {
          const edition =
            translation === "english"
              ? "en.sahih"
              : translation === "indonesian"
              ? "id.indonesian"
              : translation === "urdu"
              ? "ur.ahmedali"
              : "en.sahih";

          const altTranslation = await QuranApi.getAlternativeTranslation(
            data.surah,
            edition
          );

          if (altTranslation && altTranslation.ayahs) {
            const ayah = altTranslation.ayahs.find(
              (a) => a.numberInSurah === data.nomor
            );
            if (ayah) {
              setTranslatedText(ayah.text);
              setIsLoading(false);
              return;
            }
          }
        }

        // If alternative translation failed, try machine translation
        const textToTranslate = data.ar || "";
        if (textToTranslate) {
          const targetLanguage =
            translation === "english"
              ? "en"
              : translation === "indonesian"
              ? "id"
              : translation === "urdu"
              ? "ur"
              : "en";

          const translated = await QuranApi.translateText(
            textToTranslate,
            targetLanguage
          );
          setTranslatedText(translated);
        }
      } catch (error) {
        console.error("Translation error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only try to get translation if it's not already available
    if (!data.translation || data.translation === "Translation not available") {
      getAndSetTranslation();
    }
  }, [data, translation]);

  // Function to get the appropriate translation based on selected language
  const getTranslation = () => {
    // First try to get translation directly from data
    if (data.translation && data.translation !== "Translation not available") {
      return data.translation;
    }

    // If we have the language-specific translation field
    if (translation === "english" && (data.en || data.english)) {
      return data.en || data.english;
    } else if (translation === "indonesian" && (data.id || data.idn)) {
      return data.id || data.idn;
    } else if (translation === "urdu" && data.ur) {
      return data.ur;
    }

    // If we have the translation from our effect hook
    if (translatedText) {
      return translatedText;
    }

    // If translation is still loading
    if (isLoading) {
      return "Loading translation...";
    }

    // Default fallback
    return "Translation not available";
  };

  // Function to clean the ayat text by removing the ayat number prefix
  const cleanArabicText = (text) => {
    if (!text) return "";

    // Remove numbered prefixes like "1." or "2." at the beginning of the text
    return text.replace(/^\d+\.\s*/, "");
  };

  return (
    <div
      className={`w-full px-10 py-6 border-b border-gray-400 mb-12 relative ${theme}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {/* Arabic text section with ayat number on right if enabled */}
      <div className="w-full h-full flex justify-end mb-2 relative">
        {displayConfig.showRightAyatNumber && (
          <div className="absolute right-0 -mr-10 mt-3 text-teal-600 font-semibold text-2xl">
            -
            {data.nomor}
          </div>
        )}
        <h3
          className="font-normal text-right"
          style={{ fontSize: `${fontSize}px` }}
        >
          {cleanArabicText(data.ar)}
        </h3>
      </div>

      {/* Transliteration section */}
      <div className="w-full h-full flex justify-end mb-6">
        <span
          className="font-light text-right"
          style={{ fontSize: `${fontSize - 16}px` }}
        >
          {cleanArabicText(data.tr)}
        </span>
      </div>

      {/* Translation section */}
      <div className="w-full h-full mb-6">
        <p
          className="font-light text-left"
          style={{ fontSize: `${fontSize - 4}px` }}
        >
          {cleanArabicText(getTranslation())}
        </p>
      </div>

      {/* Only show ayat number if explicitly enabled */}
      {displayConfig.showAyatNumber && (
        <span className="font-light" style={{ fontSize: `${fontSize - 2}px` }}>
          {data.nomor}.{data.idh || ""}
        </span>
      )}

      {showIconBookmark ? (
        <IconBookMark
          data={data}
          onBookmark={onBookmark}
          setBookmark={setBookmark}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ItemAyat;

function IconBookMark({ onBookmark, data, setBookmark }) {
  return (
    <div
      className="h-10 w-10 absolute bottom-[-25px] left-4"
      onClick={() => setBookmark(data)}
    >
      <img
        src={onBookmark.id === data.id ? "bookmarkSave.png" : "bookmark.png"}
        alt={onBookmark.id === data.id ? "bookmarkSave.png" : "bookmark.png"}
        height={30}
        width={30}
      />
    </div>
  );
}
