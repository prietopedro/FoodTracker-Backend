const express = require("express");
const UserRouter = require("./routes/user");
const server = express();
server.use(express.json());

server.use("/user", UserRouter);

server.get("/", (req, res) => {
  res.status(200).json({ serverStatus: "Working" });
});

module.exports = server;
