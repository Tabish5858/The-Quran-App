import React from "react";
import LogoSection from "../../pages/layouts/LogoSection";
import MenuSection from "../../pages/layouts/MenuSection";

const LeftSection = ({ menus, onHandleClickMenu, selectedPage, theme }) => {
  return (
    <div
      className={`bg-teal-700 h-full w-full flex flex-col pt-4 px-4 items-center ${theme}`}
    >
      <div className="hidden lg:block">
        <LogoSection onHandleClickMenu={onHandleClickMenu} menu={menus[0]} />
      </div>
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
