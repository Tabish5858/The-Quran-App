import React, { useState } from "react";
import { useEffect } from "react";
import ItemAyat from "../../components/shared/ItemAyat";
import { Utils } from "../../utils";
import { UseLocalStorage } from "../../theme/UseLocalStorage";


const BookMark = () => {
  const [onBookmark, setOnBookmark] = useState({});
  const [theme, setTheme] = UseLocalStorage("theme", "dark");


  useEffect(() => {
    const bookmark = Utils.getBookmark();
    if (bookmark) {
      setOnBookmark(bookmark);
    }
  }, []);
  function removeBookmark(){
    setOnBookmark({});
    Utils.removeBookmark();
  }

  return (

    Object.keys(onBookmark).length>0?
    <div className={`w-full h-full flex flex-col justify-center items-center ${theme}`}>
      <div className="w-full flex justify-center text-teal-700 font-bold text-2xl border-b-2 border-gray-400">
        {onBookmark.namaSurah}
      </div>
      <div className=" w-full relative">
        <ItemAyat
          data={onBookmark}
          onBookmark={onBookmark}
          setBookmark={() => {}}
        />
        <div className=" flex justify-end absolute bottom-8 right-2  hover:cursor-pointer" onClick={()=>removeBookmark()}>
          <img src="remove.png" alt="remove" width={30} height={30}/>
        </div>
      </div>
    </div>:
    <div className={`w-full h-full flex justify-center items-center text-2xl ${theme}`}>Your BookMarks Will Be Here</div>
  );
};

export default BookMark;
