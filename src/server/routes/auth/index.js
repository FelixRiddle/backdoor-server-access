const express = require("express");

const emailRouter = require("./email");
const passwordRouter = require("./password");

const authRouter = express.Router();

authRouter.use('/email', emailRouter);
authRouter.use("/password", passwordRouter);

module.exports = authRouter;
