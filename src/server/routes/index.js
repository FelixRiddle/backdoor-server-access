const express = require("express");

const authRouter = require("./auth");

const serverRouter = express.Router();

serverRouter.use("/auth", authRouter);

module.exports = serverRouter;
