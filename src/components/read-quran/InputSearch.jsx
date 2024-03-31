import React from "react";

const InputSearch = ({ value, onChange ,theme}) => {
  return (
    <div className={` w-full h-24 flex justify-center items-center  ${theme}`}>
      <div className={` w-full  mx-4 rounded-xl py-1 px-8 flex justify-center items-center  relative ${theme}`}>
        <img
          src="search.png"
          alt="search"
          width={20}
          height={20}
          // className="absolute top-3 left-4"
        />
        <input 
          type="text"
          className={` h-full w-full text-xl outline-none py-2 ml-4 ${theme}`}
          placeholder="Search Surah"
          value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
    </div>
  );
};

export default InputSearch;
