import React, { useEffect, useState } from "react";
import LeftSection from "../../components/read-quran/LeftSection";
import RightSection from "../../components/read-quran/RightSection";
import { QuranApi } from "../../services/quran_api";
import Loading from "../../components/Loading";
import { UseLocalStorage } from "../../theme/UseLocalStorage";

const ReadQuran = () => {
  const [listSurah, setListSurah] = useState([]);
  const [detailSurah, setDetailSurah] = useState({});
  const [loading, setloading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [theme, setTheme] = UseLocalStorage("theme", "dark");

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    getSurah();
  }, []);

  async function getSurah() {
    await QuranApi.getSurah().then((surah) => {
      setListSurah(surah);
      setloading(false);
    });
  }
  async function getDetailSurah(nomor) {
    await QuranApi.getDetailSurah(nomor).then((detailSurah) => {
      setDetailSurah(detailSurah);
      setLoadingDetail(false);
    });
  }

  return (
    <div className=" flex w-full h-screen">
      {loading ? (
        <Loading />
      ) : (
        <>
          <LeftSection
            listSurah={listSurah ?? []}
            getDetailSurah={getDetailSurah}
            theme={theme}
          />
          <RightSection
            detailSurah={detailSurah ?? []}
            loadingDetail={loadingDetail}
            theme={theme}
          />
        </>
      )}
    </div>
  );
};

export default ReadQuran;
