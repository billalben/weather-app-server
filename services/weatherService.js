const fetchWeather = require("../utils/fetchWeather");

const getCurrentWeather = async (lat, lon) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  return await fetchWeather(URL);
};

const getForecast = async (lat, lon) => {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`;
  return await fetchWeather(URL);
};

const getAirPollution = async (lat, lon) => {
  const URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}`;
  return await fetchWeather(URL);
};

const getReverseGeocoding = async (lat, lon) => {
  const URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5`;
  return await fetchWeather(URL);
};

const getGeoCoding = async (query) => {
  const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
  return await fetchWeather(URL);
};

module.exports = {
  getCurrentWeather,
  getForecast,
  getAirPollution,
  getReverseGeocoding,
  getGeoCoding,
};
