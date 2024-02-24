/**
 * Email confirmation's backdoor access
 */
const express = require("express");

const emailConfirmationRouter = require("./email_confirmation");

const emailRouter = express.Router();

emailRouter.use(emailConfirmationRouter);

module.exports = emailRouter;
