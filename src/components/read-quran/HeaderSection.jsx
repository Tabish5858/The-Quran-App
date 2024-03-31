import React, { useState, useEffect,useContext } from "react";
import { UseLocalStorage } from "../../theme/UseLocalStorage";

function HeaderSection({ namaSurah ,fontSize,setFontSize}) {
  const [theme, setTheme] = UseLocalStorage("theme", "dark");
  // const [fontSize,setFontSize]=UseLocalStorage("fontSize",16)


  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    document.body.dataset.fontSize = fontSize;
  }, [fontSize]);

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  const handleFontIncrease = () => {
    setFontSize((prevFontSize) => prevFontSize + 1);
    console.log(fontSize);
  };

  const handleFontDecrease = () => {
    setFontSize((prevFontSize) => prevFontSize - 1);
    console.log(fontSize);
  };

  return (
    <div
      className={`h-[84px] w-full flex justify-between items-center px-8 border-b border-gray-200  ${theme}`}
    >
      <h3 className="text-3xl font-bold text-teal-700">{namaSurah}</h3>

      <div className="flex justify-around flex-row items-start w-40">
        <img
          src="font+.png"
          alt="font+"
          height={30}
          width={30}
          onClick={handleFontIncrease}
        />
        <img
          src="font-.png"
          alt="font-"
          height={30}
          width={30}
          onClick={handleFontDecrease}
        />
        <img
          src={theme === "dark" ? "sun.png" : "moon.png"}
          alt={theme === "dark" ? "moon" : "sun"}
          height={30}
          width={30}
          onClick={handleToggleTheme}
        />
      </div>
    </div>
  );
}

export default HeaderSection;