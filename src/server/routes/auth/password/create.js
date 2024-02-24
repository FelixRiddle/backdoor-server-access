const express = require("express");
const ResetPasswordPrivateKey = require("../../../../env/private/privateKeyManager/ResetPasswordPrivateKey");

const createRouter = express.Router();

createRouter.get("/create", (req, res) => {
    try {
        const resetPasswordPrivateKey = new ResetPasswordPrivateKey();
        const key = resetPasswordPrivateKey.loadLocally();
        
        return res.send({
            key,
        });
    } catch(err) {
        console.error(err);
    }
});

createRouter.post("/create", (req, res) => {
    
});

module.exports = createRouter;
