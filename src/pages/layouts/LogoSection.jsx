import React from "react";

const LogoSection = ({onHandleClickMenu,menu}) => {
  return (
    <div
      className="mb-4 flex  flex-col justify-center items-center hover:cursor-pointer"
      onClick={() => onHandleClickMenu(menu)}
    >
      <div className="bg-white w-max p-2 rounded-2xl ">
        <img src="koran.png" alt="logo.png" height={50} width={50} />
      </div>
      <h3 className="text-white font-bold text-2xl mt-2">The Living Quran</h3>
    </div>
  );
};

export default LogoSection;
