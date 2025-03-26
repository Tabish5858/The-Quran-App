import React from "react";
import { UseLocalStorage } from "../../theme/UseLocalStorage";

const Home = () => {
  const [theme, setTheme] = UseLocalStorage("theme", "dark");

  return (
    <div
      className={`w-full h-full flex flex-col justify-center items-center space-y-4 p-4 ${theme}`}
    >
      <img
        src="logo.png"
        alt="logo.png"
        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
      />
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-center">
        Welcome To The Living Quran
      </h3>
    </div>
  );
};

export default Home;
