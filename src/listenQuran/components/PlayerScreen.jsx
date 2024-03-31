import { useEffect } from "react";
import ReactPlayer from "react-player";

const PlayerScreen = ({ reciterDetail, chapterDetail,theme }) => {
  const audiLink = (reciter, number) =>
    reciter + "/" + ("00" + number).slice(-3) + ".mp3";

  useEffect(() => {
    console.log('reciterDetail', reciterDetail);
  console.log('chapterDetail', chapterDetail);
  }, [chapterDetail, reciterDetail]);

  return (
    <div className={`h-screen shadow-lg p-3 overflow-y-auto flex flex-col justify-center items-center ${theme}`}>
      <ph1 className="  text-2xl font-bold absolute top-1 border-b-2 ">Player</ph1> <hr />
      {reciterDetail !== null && chapterDetail !== null ? (
        <ul className="list-none text-left">
          <div>
            <li
              className={`bg-transparent border-0  py-0 flex justify-between`}
            >
              <span className="font-bold text-xl">Reciter: </span>{" "}
              <span  className="text-end text-2xl text-teal-600">{reciterDetail.name}</span>
            </li>
            <hr />
            <li
              className={`bg-transparent border-0  py-0 flex justify-between`}
            >
              <span className="font-bold text-xl">Chapter In Arabic: </span>{" "}
              <span  className="text-end text-2xl text-teal-600">{chapterDetail.name_arabic}</span>
            </li>
            <hr />

            <li
              className={`bg-transparent border-0  py-0 flex justify-between`}
            >
              <span className="font-bold text-xl">Chapter In English: </span>{" "}
              <span  className="text-end text-2xl text-teal-600">{chapterDetail.name_complex}</span>
            </li>
            <hr />
            <li
              className={`bg-transparent border-0  py-0 flex justify-between`}
            >
              <span className="font-bold text-xl">Revelation Place: </span>{" "}
              <span  className="text-end text-2 text-teal-600">{chapterDetail.revelation_place}</span>
            </li>
            <hr />
            <li
              className={`bg-transparent border-0  py-0 flex justify-between`}
            >
              <span className="font-bold text-xl " >Translated Name: </span>{" "}
              <span className="text-end text-2xl text-teal-600">{chapterDetail.translated_name.name}</span>
            </li>
            <hr />

            <div className="div ">
              <ReactPlayer
                url={audiLink(reciterDetail.Server, chapterDetail.id)}
                controls={true}
                playing={true}
                width="100%"
                height="60px"
              />
            </div>
          </div>
        </ul>
      ) : (
        <div className="text-center">
          <span className="animate-spin"></span>
        </div>
      )}
    </div>
  );
};

export default PlayerScreen;