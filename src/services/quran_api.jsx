import axios from "axios";

export const QuranApi = {
  getSurah: async function () {
    try {
      const response = await fetch("https://equran.id/api/surat");
      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  },

  getDetailSurah: async function (nomor, translation = "english") {
    try {
      const response = await fetch(`https://equran.id/api/surat/${nomor}`);
      const data = await response.json();

      if (data.ayat && data.ayat.length > 0) {
        try {
          let translationId;
          let useAlQuranCloud = false;

          if (translation === "english") {
            translationId = 131;
          } else if (translation === "indonesian") {
            translationId = 33;
          } else if (translation === "urdu") {
            useAlQuranCloud = true;
          } else {
            translationId = 131;
          }

          if (useAlQuranCloud) {
            try {
              const altResponse = await axios.get(
                `https://api.alquran.cloud/v1/surah/${nomor}/ur.jalandhry`
              );

              if (
                altResponse.data &&
                altResponse.data.status === "OK" &&
                altResponse.data.data &&
                altResponse.data.data.ayahs
              ) {
                const urduTranslations = altResponse.data.data.ayahs;

                data.ayat = data.ayat.map((ayat) => {
                  const urduAyah = urduTranslations.find(
                    (a) => a.numberInSurah === ayat.nomor
                  );

                  let translationText = "Translation not available";
                  if (urduAyah && urduAyah.text) {
                    translationText = urduAyah.text
                      .replace(/<\/?[^>]+(>|$)/g, "")
                      .replace(/\s*\d+\s*$/, "")
                      .replace(/\[\d+\]/g, "")
                      .replace(/<sup[^>]*>.*?<\/sup>/g, "");
                  }

                  return {
                    ...ayat,
                    translation: translationText,
                    surah: nomor,
                  };
                });
              }
            } catch (urduError) {
              useAlQuranCloud = false;
              translationId = 97;
            }
          }

          if (!useAlQuranCloud) {
            const translationsResponse = await axios.get(
              `https://api.qurancdn.com/api/qdc/verses/by_chapter/${nomor}?translation_fields=text&translations=${translationId}`
            );

            if (translationsResponse.data && translationsResponse.data.verses) {
              const verses = translationsResponse.data.verses;

              data.ayat = data.ayat.map((ayat) => {
                const verse = verses.find((v) => v.verse_number === ayat.nomor);
                let translationText = "Translation not available";

                if (
                  verse &&
                  verse.translations &&
                  verse.translations.length > 0
                ) {
                  translationText = verse.translations[0].text
                    .replace(/<\/?[^>]+(>|$)/g, "")
                    .replace(/\s*\d+\s*$/, "")
                    .replace(/\[\d+\]/g, "");
                }

                return {
                  ...ayat,
                  translation: translationText,
                  surah: nomor,
                };
              });
            }
          }
        } catch (translationError) {
          console.log("Error fetching translations:", translationError);
        }
      }

      return data;
    } catch (e) {
      console.log(e);
      return {};
    }
  },

  getAlternativeTranslation: async function (
    surahNumber,
    edition = "en.sahih"
  ) {
    try {
      const response = await axios.get(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/${edition}`
      );

      if (response.data && response.data.status === "OK") {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching alternative translation:", error);
      return null;
    }
  },

  translateText: async function (text, targetLanguage = "en") {
    try {
      const response = await axios.post(
        "https://libretranslate.de/translate",
        {
          q: text,
          source: "ar",
          target: targetLanguage,
          format: "text",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.translatedText) {
        return response.data.translatedText;
      }
      return `[Translation failed]`;
    } catch (error) {
      console.error("Translation error:", error);
      return `[Translation error]`;
    }
  },
};
