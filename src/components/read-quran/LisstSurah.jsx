import React from "react";
import ItemSurah from "./ItemSurah";


const LisstSurah = ({ listSurah, getDetailSurah,theme }) => {

  return (
    <div
      className= {` h-full w-full p-4 overflow-y-auto ${theme}`}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "teal",
        scrollbarTrackColor: "gray",
        scrollBehavior: "smooth",
      }}
    >
      {listSurah.map((surah, index) => (
        <div onClick={() => getDetailSurah(surah.nomor)} key={index}>
          <ItemSurah
            nomor={surah.nomor}
            namaSurah={surah.nama_latin}
            artiSurah={surah.arti}
            tempatTurunSurah={surah.tempat_turun}
            jumlahAyat={surah.jumlah_ayat}
            getDetailSurah
            theme={theme}
          />
        </div>
      ))}
    </div>
  );
};

export default LisstSurah;
