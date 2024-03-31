export const QuranApi = {
  getSurah: async function () {
    try {
      const response = await fetch("https:/equran.id/api/surat");
      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  getDetailSurah: async function (nomor) {
    try {
      const response = await fetch(`https:/equran.id/api/surat/${nomor}`)
      const data= await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
};

