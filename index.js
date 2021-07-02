require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
