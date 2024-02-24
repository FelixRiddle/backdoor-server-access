/**
 * Email confirmation's backdoor access
 */
const express = require("express");

const emailConfirmationRouter = express.Router();

emailConfirmationRouter.post("/email_confirmation", (req, res) => {
    
});

module.exports = emailConfirmationRouter;
