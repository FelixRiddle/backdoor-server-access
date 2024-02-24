const express = require("express");

const createRouter = require("./create");

const passwordRouter = express.Router();

passwordRouter.use(createRouter);

module.exports = passwordRouter;
