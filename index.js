require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimiter = require("./middlewares/rateLimiter");
const weatherRoutes = require("./routes/weather");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const whiteList = [
  "http://127.0.0.1",
  "http://127.0.0.1:5500",
  "http://localhost",
  "http://localhost:5500",
  "https://billalben.github.io/weather-app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By CORS"));
    }
  },
  optionsSuccessStatus: 200,
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
