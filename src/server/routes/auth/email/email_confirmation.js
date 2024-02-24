/**
 * Email confirmation's backdoor access
 */
const express = require("express");

const ConfirmationEmailPrivateKey = require("../../../../env/private/privateKeyManager/ConfirmationEmailPrivateKey");

const emailConfirmationRouter = express.Router();

/**
 * Get should be used to get the key
 */
emailConfirmationRouter.get("/email_confirmation", (req, res) => {
    try {
        const emailPrivateKey = new ConfirmationEmailPrivateKey();
        const key = emailPrivateKey.loadLocally();
        
        return res.send({
            key,
        });
    } catch(err) {
        console.error(err);
    }
});

/**
 * Post should be used to check if keys match
 */
emailConfirmationRouter.post("/email_confirmation", (req, res) => {
    try {
        
    } catch(err) {
        
    }
});

module.exports = emailConfirmationRouter;
