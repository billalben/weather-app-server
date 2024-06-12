const express = require("express");
const router = express.Router();
const weatherService = require("../services/weatherService");

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the weather API" });
});

router.get("/current", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ message: "Please provide latitude and longitude" });
  }
  const data = await weatherService.getCurrentWeather(lat, lon);
  res.json(data);
});

router.get("/forecast", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ message: "Please provide latitude and longitude" });
  }
  const data = await weatherService.getForecast(lat, lon);
  res.json(data);
});

router.get("/air-pollution", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ message: "Please provide latitude and longitude" });
  }
  const data = await weatherService.getAirPollution(lat, lon);
  res.json(data);
});

router.get("/reverse-geocoding", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ message: "Please provide latitude and longitude" });
  }
  const data = await weatherService.getReverseGeocoding(lat, lon);
  res.json(data);
});

router.get("/geo-coding", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Please provide a city" });
  }
  const data = await weatherService.getGeoCoding(query);
  res.json(data);
});

module.exports = router;
