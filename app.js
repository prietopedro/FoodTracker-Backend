const express = require("express");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ serverStatus: "Working" });
});

module.exports = server;
