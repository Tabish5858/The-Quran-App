import React, { useState,useEffect } from "react";
import LeftSection from "../../components/layouts/LeftSection";
import ReadQuran from "../read_quran/Read-Quran";
import BookMark from "../bookmark/Bookmark";
import Home from "../home/Home";
import HomeScreen from "../../listenQuran/components/HOmeScreen";

const Layouts = () => {
  
  const menus = [
    {
      name: "Home",
      page: <Home />,
    },
    {
      name: "Read Quran",
      page: <ReadQuran />,
    },
    {
      name: "Listen Quran",
      page: <HomeScreen />,
    },
    {
      name: "BookMarks",
      page: <BookMark />,
    },
  ];

  const [selectedPage, setSelectedPage] = useState(menus[0]);
  

  function onHandleClickMenu(menu) {
    setSelectedPage(menu);
  }

  return (
    <div className="h-screen w-full flex ">
      <LeftSection
        menus={menus}
        onHandleClickMenu={onHandleClickMenu}
        selectedPage={selectedPage}
      />

      <div className=" h-full w-full ">{selectedPage.page}</div>
    </div>
  );
};

export default Layouts;
