const fs = require('node:fs');

const ConfirmationEmailPrivateKey = require("./ConfirmationEmailPrivateKey");
const ResetPasswordPrivateKey = require("./ResetPasswordPrivateKey");

/**
 * Create private key directories
 */
module.exports = function createPrivateKeyDirectories() {
    try {
        // For email
        const emailPrivateKeyPath = ConfirmationEmailPrivateKey.defaultFolderPath();
        fs.mkdirSync(emailPrivateKeyPath, { recursive: true });
        console.log(`Email folder created!`);
    } catch(err) {
        console.log(`Error: `, err);
    }
    
    try {
        // For password
        const passwordPrivateKeyPath = ResetPasswordPrivateKey.defaultFolderPath();
        fs.mkdirSync(passwordPrivateKeyPath, { recursive: true });
        console.log(`Password folder created!`);
    } catch(err) {
        console.log(`Error: `, err);
    }
}
