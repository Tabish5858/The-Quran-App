import React from "react";
import LogoSection from "../../pages/layouts/LogoSection";
import MenuSection from "../../pages/layouts/MenuSection";

const LeftSection = ({ menus, onHandleClickMenu, selectedPage,theme}) => {
  return (
    <div className={`bg-teal-700 h-full basis-1/5 flex flex-col pt-4 px-4 items-center  ${theme} `}>
      <LogoSection onHandleClickMenu={onHandleClickMenu} menu={menus[0]} />
      <MenuSection
        menus={menus}
        onHandleClickMenu={onHandleClickMenu}
        selectedPage={selectedPage}
        theme={theme}
      />
    </div>
  );
};

export default LeftSection;
