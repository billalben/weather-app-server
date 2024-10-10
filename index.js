require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimiter = require("./middlewares/rateLimiter");
const weatherRoutes = require("./routes/weather");

const job = require("./utils/cron");

job.start();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const isProduction = process.env.NODE_ENV === "production";

const corsOptions = {
  origin: isProduction ? "https://weather-io-app.netlify.app" : "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use("/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
