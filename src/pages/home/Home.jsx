import React from "react";
import { UseLocalStorage } from "../../theme/UseLocalStorage";

const Home = () => {
  const [theme, setTheme] = UseLocalStorage("theme", "dark");

  return (
    <div className={`w-full h-full flex  flex-col justify-center items-center space-y-4 ${theme}`}>
      <img src="logo.png" alt="logo.png" width={80} height={80} />
      <h3 className="text-4xl font-normal">Welcome To The Living Quran</h3>
    </div>
  );
};

export default Home;
