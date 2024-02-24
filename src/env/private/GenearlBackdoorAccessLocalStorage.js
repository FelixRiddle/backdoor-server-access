const fs = require('node:fs');

const ConfirmationEmailPrivateKey = require("./privateKeyManager/ConfirmationEmailPrivateKey");
const ResetPasswordPrivateKey = require("./privateKeyManager/ResetPasswordPrivateKey");

/**
 * General backdoor access local storage keys management
 * 
 * What a name
 * 
 * This is to [Flatten] multiple private key storage managers
 */
module.exports = class GeneralBackdoorAccessLocalStorage {
    
    constructor() {}
    
    /**
     * Initialize
     * 
     * Create folders and store keys
     */
    initialize() {
        this.createPrivateKeyDirectories()
            .createPrivateKeys();
    }
    
    // --- Storage management ---
    /**
     * Create private key directories
     */
    createPrivateKeyDirectories() {
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
        
        return this;
    }
    
    /**
     * Create private keys
     */
    createPrivateKeys() {
        try {
            // For email
            const emailPrivateKeyPath = new ConfirmationEmailPrivateKey();
            emailPrivateKeyPath
                .setPrivateKey()
                .saveLocally();
        } catch(err) {
            console.log(`Error: `, err);
        }
        
        try {
            // For password
            const passwordPrivateKeyPath = new ResetPasswordPrivateKey();
            passwordPrivateKeyPath
                .setPrivateKey()
                .saveLocally();
        } catch(err) {
            console.log(`Error: `, err);
        }
        
        return this;
    }
}
