import React from "react";

const ItemSurah = ({
  nomor,
  namaSurah,
  artiSurah,
  tempatTurunSurah,
  jumlahAyat,
  theme,
  isActive = false,
}) => {
  return (
    <div
      className={`h-24 w-full border-b-2 border-teal-700 flex mb-4 hover:cursor-pointer transition-all duration-300 ${theme} ${
        isActive
          ? "bg-teal-50 dark:bg-teal-900/30 rounded-lg shadow-md transform scale-[1.02]"
          : "hover:bg-teal-50/50 dark:hover:bg-teal-900/10"
      }`}
    >
      <div className="basis-12 flex justify-end mr-4">
        <h3
          className={`text-2xl font-bold ${
            isActive ? "text-teal-600" : "text-teal-700"
          }`}
        >
          {nomor}
        </h3>
      </div>
      <div className="flex flex-col">
        <h3
          className={`text-2xl font-bold ${
            isActive ? "text-teal-600" : "text-teal-700"
          }`}
        >
          {namaSurah}
        </h3>
        <h5 className="text-base font-normal text-gray-500">{artiSurah}</h5>
        <span className="text-base font-light text-gray-500">
          {tempatTurunSurah}, {jumlahAyat} ayat
        </span>
      </div>
    </div>
  );
};

export default ItemSurah;
