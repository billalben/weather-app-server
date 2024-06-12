const axios = require("axios");

const fetchWeather = async (URL) => {
  try {
    const response = await axios.get(
      `${URL}&appid=${process.env.WEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    return { error: error.stack };
  }
};

module.exports = fetchWeather;
