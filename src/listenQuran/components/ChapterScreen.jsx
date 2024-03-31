import React, { useState } from "react";

const ChapterScreen = ({ chapters, chapterHandler }) => {
  const [activeId, setActiveId] = useState("");
  return (
    
    <div className="h-screen shadow-lg p-3 bg-custom-green overflow-y-auto mb-24">
      <h1 className="text-lg font-bold text-center">Chapters</h1> 
      <hr />
      <ul className="list-none text-right">
        {chapters && chapters.length > 0 ? (
          chapters.map((chapter) => (
            <div key={chapter.id}>
              <li
                onClick={(e) => {
                  chapterHandler(chapter);
                  setActiveId(chapter.id);
                }}
                className={`list-none bg-transparent border-0 text-light py-0 flex justify-between cursor-pointer ${
                  chapter.id === activeId ? "active" : ""
                }`}
              >
                <span>{chapter.id} - </span> <span>{chapter.name_arabic}</span>
              </li>
              <hr />
            </div>
          ))
        ) : (
          <div className="text-center">
            <span className=" animate-spin"></span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ChapterScreen;