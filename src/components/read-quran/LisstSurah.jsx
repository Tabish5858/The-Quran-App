import React from "react";
import ItemSurah from "./ItemSurah";

const LisstSurah = ({ listSurah, getDetailSurah, theme, currentSurah }) => {
  return (
    <div
      className={`h-full w-full p-4 overflow-y-auto ${theme}`}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "teal",
        scrollbarTrackColor: "gray",
        scrollBehavior: "smooth",
      }}
    >
      {listSurah.length > 0 ? (
        listSurah.map((surah, index) => (
          <div onClick={() => getDetailSurah(surah.nomor)} key={index}>
            <ItemSurah
              nomor={surah.nomor}
              namaSurah={surah.nama_latin}
              artiSurah={surah.arti}
              tempatTurunSurah={surah.tempat_turun}
              jumlahAyat={surah.jumlah_ayat}
              isActive={currentSurah === surah.nomor}
              theme={theme}
            />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 15l-5-5 5-5"
            ></path>
          </svg>
          <p className="mt-4 text-gray-500">No results found</p>
          <p className="text-sm text-gray-400">Try a different search term</p>
        </div>
      )}
    </div>
  );
};

export default LisstSurah;
