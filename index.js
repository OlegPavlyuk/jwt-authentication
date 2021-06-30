require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router/index");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

// Error handling
app.use((err, req, res, next) => {
  console.log(err);

  return res.status(500).json({ message: "Something went wrong" });
});

const start = () => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
};

start();
