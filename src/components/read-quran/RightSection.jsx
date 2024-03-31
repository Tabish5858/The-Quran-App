import React, { useState, useEffect } from "react";
import Home from "../../pages/home/Home";
import HeaderSection from "./HeaderSection";
import ItemAyat from "../shared/ItemAyat";
import { Utils } from "../../utils";
import { UseLocalStorage } from "../../theme/UseLocalStorage";

const RightSection = ({ detailSurah, loadingDetail, theme }) => {
  const [onBookmark, setOnBookMark] = useState({});
  const [fontSize,setFontSize]=UseLocalStorage("fontSize",16)

  function setBookmark(value) {
    const bookmark = Utils.getBookmark();

    if (bookmark && bookmark["id"] === value.id) {
      setBookmark({});
      return Utils.removeBookmark();
    }

    Utils.setBookmark({ ...value, namaSurah: detailSurah.nama_latin });
    setOnBookMark({ ...value, namaSurah: detailSurah.nama_latin });
  }

  useEffect(() => {
    const bookmark = Utils.getBookmark();
    if (bookmark) {
      setOnBookMark(bookmark);
    }
  }, []);

  function isNotEmpty() {
    return Object.keys(detailSurah).length > 0;
  }

  return loadingDetail ? (
    <>
      <Home />
    </>
  ) : (
    <div className={`bg-white basis-3/4 flex-col ${theme}`}>
      {isNotEmpty() ? (
        <>
          <HeaderSection  
          fontSize={fontSize}
          setFontSize={setFontSize}
           theme={theme} 
           namaSurah={detailSurah.nama_latin} />
          <div className={`h-full w-full overflow-y-auto ${theme}`}>
            {detailSurah.ayat.map((data, index) => (
              <ItemAyat
                key={index}
                data={data}
                setBookmark={setBookmark}
                onBookmark={onBookmark}
                showIconBookmark={true}
                theme={theme}
                fontSize={fontSize}
              />
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RightSection;
