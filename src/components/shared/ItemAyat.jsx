import React from "react";

const ItemAyat = ({
  data,
  setBookmark,
  onBookmark,
  showIconBookmark = false,
  theme,
  fontSize,
}) => {
  return (
    <div
      className={`w-full px-10 py-6 border-b border-gray-400 mb-12 relative ${theme}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      <div className="w-full h-full flex  justify-end mb-2">
        <h3 className="font-normal" style={{ fontSize: `${fontSize}px` }}>
          {data.ar}
        </h3>
      </div>

      <div className="w-full h-full flex  justify-end mb-6">
        <span className="font-light" style={{ fontSize: `${fontSize - 16}px` }}>
          {data.tr}
        </span>
      </div>

      <span className="font-light" style={{ fontSize: `${fontSize}px` }}>
        {data.nomor}.{data.idh}
      </span>
      {showIconBookmark ? (
        <IconBookMark
          data={data}
          onBookmark={onBookmark}
          setBookmark={setBookmark}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ItemAyat;

function IconBookMark({ onBookmark, data, setBookmark }) {
  return (
    <div
      className=" h-10 w-10 absolute bottom-[-25px] left-4"
      onClick={() => setBookmark(data)}
    >
      <img
        src={onBookmark.id === data.id ? "bookmarkSave.png" : "bookmark.png"}
        alt={onBookmark.id === data.id ? "bookmarkSave.png" : "bookmark.png"}
        height={30}
        width={30}
      />
    </div>
  );
}
