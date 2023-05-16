const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// logger
app.use(morgan("dev"));

// cors
app.use(
  cors({
    origin: "*",
    credentials: "true",
    // cors options
  })
);

const apiMainRouter = require("./routes/index");
app.use("/api", [apiMainRouter]);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
