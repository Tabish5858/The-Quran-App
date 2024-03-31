import React, { useState, useEffect } from "react";
import RecitersScreen from "./RecitersScreen";
import axios from "axios";
import ChapterScreen from "./ChapterScreen";
import PlayerScreen from "./PlayerScreen";
import { UseLocalStorage } from "../../theme/UseLocalStorage";
import Loading from "../../components/Loading";

const HomeScreen = () => {
  const [reciters, setReciters] = useState([]);
  const [chapters, setChapters] = useState([]);

  const [loading, setloading] = useState(true);
  // const [loadingDetail, setLoadingDetail] = useState(true);

  const [chapterDetail, setChapterDetail] = useState(null);
  const [reciterDetail, setReciterDetail] = useState(null);
  const [theme, setTheme] = UseLocalStorage("theme", "dark");

  // Get All Reciters with Audio
  useEffect(() => {
    async function fetchData() {
      const {
        data: { reciters },
      } = await axios.get(`https://mp3quran.net/api/_english.php`);

      setReciters(reciters);
      setloading(false);
    }

    fetchData();
  }, []);

  // Get All Chapters
  useEffect(() => {
    async function fetchData() {
      const {
        data: { chapters },
      } = await axios.get(`https://api.quran.com/api/v4/chapters`);

      setChapters(chapters);
      // setLoadingDetail(false);
      setloading(false);
    }
    reciters && reciters.length > 0 && fetchData();
  }, [reciters]);

  const reciterHandler = (reciter) => {
    console.log("Selected reciter: ", reciter);
    setReciterDetail(reciter);
  };
  const chapterHandler = (chapter) => {
    console.log("Selected chapter: ", chapter);
    setChapterDetail(chapter);
  };

  return (
    <div className={`flex flex-row w-full  bg-custom-green ${theme}`}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-1/3 overflow-auto bg-custom-green">
            <RecitersScreen
              reciters={reciters}
              reciterHandler={reciterHandler}
            />
          </div>
          <div className="w-1/3 overflow-auto bg-custom-green ">
            <ChapterScreen
              chapters={chapters}
              chapterHandler={chapterHandler}
            />
          </div>
          <div className="w-1/3 overflow-auto bg-custom-green">
            <PlayerScreen
              reciterDetail={reciterDetail}
              chapterDetail={chapterDetail}
              theme={theme}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
