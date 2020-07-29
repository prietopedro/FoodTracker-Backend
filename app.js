const express = require("express");
const cors = require("cors");
const UserRouter = require("./routes/user");
const TruckRouter = require("./routes/truck");
const validateToken = require("./middleware/validateToken");
const server = express();
server.use(express.json());
server.use(cors());

server.use("/user", UserRouter);
server.use(validateToken);
server.use("/trucks", TruckRouter);

server.get("/", (req, res) => {
  res.status(200).json({ serverStatus: "Working" });
});

module.exports = server;
