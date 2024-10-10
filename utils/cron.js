const cron = require("node-cron");
const https = require("https");

const URL = "https://billalben.github.io/weather-app";

const job = new cron.schedule("*/10 * * * *", function () {
  https
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log(`GET request sent`);
      } else console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => {
      console.error("Error while sending request", e);
    });
});

module.exports = job;
