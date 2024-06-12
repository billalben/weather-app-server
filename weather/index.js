const express = require("express");
const router = express.Router();
const axios = require("axios");

const fetchWeather = async (URL) => {
  try {
    const response = await axios.get(
      `${URL}&appid=${process.env.WEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    return { Error: error.stack };
  }
};

router.get("/", async (req, res) => {
  return res.json({ message: "Welcome to the weather API" });
});

router.get("/current", async (req, res) => {
  const { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ message: "Please provide latitude and longitude" });
  }

  const data = await fetchWeather(url);

  return res.json(data);
});

router.get("/forecast", async (req, res) => {
  const { lat, lon } = req.query;
  const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ message: "Please provide latitude and longitude" });
  }

  const data = await fetchWeather(URL);

  return res.json(data);
});

router.get("/airpollution", async (req, res) => {
  const { lat, lon } = req.query;
  const URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}`;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ message: "Please provide latitude and longitude" });
  }

  const data = await fetchWeather(URL);

  return res.json(data);
});

router.get("/reversegeocoding", async (req, res) => {
  const { lat, lon } = req.query;
  const URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5`;

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ message: "Please provide latitude and longitude" });
  }

  const data = await fetchWeather(URL);

  return res.json(data);
});

router.get("/geocoding", async (req, res) => {
  // const city = req.params.city;
  const query = req.query.q;
  const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;

  if (!query) {
    return res.status(400).json({ message: "Please provide a city" });
  }

  const data = await fetchWeather(URL);

  return res.json(data);
});

// router.post("/", async (req, res) => {
//   const city = req.body.city;

//   const data = await fetchWeather(city);

//   return res.json(data);
// });

module.exports = router;
