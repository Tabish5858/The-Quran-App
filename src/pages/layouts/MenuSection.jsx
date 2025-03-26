/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const MenuSection = ({ menus, onHandleClickMenu, selectedPage }) => {
  return (
    <div className="w-full h-full flex flex-col space-y-4 lg:space-y-10 justify-start lg:justify-center pt-6 lg:pt-0 pb-4">
      {menus.map((menu, index) =>
        index !== 0 ? (
          <div
            onClick={() => onHandleClickMenu(menu)}
            key={index}
            className={`h-10 flex justify-center items-center text-white text-lg lg:text-xl font-semibold border-b-2 cursor-pointer rounded-lg ${
              selectedPage.name === menu.name
                ? "border border-white rounded-lg"
                : "border-b-white hover:border hover:border-white hover:rounded-lg"
            }`}
          >
            {menu.name}
          </div>
        ) : (
          <div key={index}></div>
        )
      )}
    </div>
  );
};

export default MenuSection;
