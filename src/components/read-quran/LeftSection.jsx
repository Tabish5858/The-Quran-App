import React, {  useState } from "react";
import LisstSurah from "./LisstSurah";
import InputSearch from "./InputSearch";

const LeftSection = ({ listSurah, getDetailSurah,theme }) => {
  const [search, setSearch] = useState("");
  const [listSurahBaru, setListSurahBaru] = useState([]);


  function onChangeHandler(e) {
    e.preventDefault();
    setSearch(e.target.value);

    if (search.length > 2) {
      const listSurahTemp = listSurah.filter((surah) =>
        surah.nama_latin.toLowerCase().includes(search.toLowerCase())
      );
      setListSurahBaru(listSurahTemp);
    }
  }
  return (
    <div className={`bg-white basis-1/4 flex flex-col ${theme}`}>
      <InputSearch  value={search} onChange={onChangeHandler} theme={theme}/>

      {listSurah.length > 0 ? (
        <LisstSurah
          listSurah={search.length > 2 ? listSurahBaru : listSurah}
          getDetailSurah={getDetailSurah}
          theme={theme}
        />
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          Bad Connection
        </div>
      )}
    </div>
  );
};

export default LeftSection;
