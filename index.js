require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
// const Port = process.env.PORT || 3000;
const Port = 3000;

const weather = require("./weather");

const app = express();

app.use(express.json());

const whiteList = ["http://127.0.0.1", "http://127.0.0.1:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error("Not Allowed By CORS"));
  },
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(cors());

const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});
app.use(limiter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use("/weather", weather);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
