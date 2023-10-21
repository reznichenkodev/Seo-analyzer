import * as cheerio from "cheerio";
import axios from "axios";

class AnalyzeTime {
  async index(req, res) {
    try {
      const url = req.body.url;

      // Создаем объект для измерения времени
      const analyzeTime = {
        start: null,
        stop: null,
        startTimer() {
          this.start = Date.now();
        },
        stopTimer() {
          this.stop = Date.now();
          const elapsed = (this.stop - this.start) / 1000;
          // console.log(`Time taken to load page: ${elapsed} seconds`);
        },
      };

      analyzeTime.startTimer(); // Запускаем таймер

      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      analyzeTime.stopTimer(); // Останавливаем таймер после загрузки страницы

      const analysisResult = {
        loadTime:(analyzeTime.stop - analyzeTime.start) / 1000,
      };
      // console.log(analysisResult)
      res.json(analysisResult);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new AnalyzeTime();
