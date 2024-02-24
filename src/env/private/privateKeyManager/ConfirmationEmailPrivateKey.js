const axios = require("axios");
const generator = require("generate-password");

const { envServerUrl } = require("../../env");
const LocalStorage = require("../LocalStorage");

module.exports = class ConfirmationEmailPrivateKey extends LocalStorage {
    constructor() {
        super("EMAIL_CONFIRMATION_KEY", ConfirmationEmailPrivateKey.defaultFilePath());
    }
    
    /**
     * Confirm an email
     * 
     * @param {string} email User email
     */
    async confirmEmail(email) {
        const instance = axios.create({
            baseURL: `${envServerUrl()}/auth`,
            timeout: 2000,
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = {
            key: this.loadLocally(),
            email,
        };
        
        const res = await instance.post("/email", data)
            .then((res) => res)
            .catch((err) => { });
        
        return res.data;
    }
    
    // --- Save and retrieve ---
    /**
     * Default folder path
     * 
     * @returns 
     */
    static defaultFolderPath() {
        return "./.cache/routes/auth/email";
    }
    
    /**
     * Default file path
     */
    static defaultFilePath() {
        // But I see no other way
        return `${this.defaultFolderPath()}/confirmationEmailPrivateKey.json`;
    }
    
    // /**
    //  * Email confirmation private key
    //  */
    // getKey() {
    //     return process.env["KEY_EMAIL_CONFIRMATION"];
    // }
    
    // /**
    //  * Set or change confirmation email private key
    //  * 
    //  * For greater protection change this every time it's used hehe
    //  */
    // setKey() {
    //     process.env["KEY_EMAIL_CONFIRMATION"] = generator.generate({
    //         length: 64,
    //         numbers: true,
    //     });
    // }
    
    
    // /**
    //  * Set file path and name
    //  */
    // setFilePath(filePath) {
    //     this.filePath = filePath;
    // }
    
    // /**
    //  * Store locally as json
    //  */
    // saveLocally() {
    //     const data = {
    //         key: this.emailConfirmationPrivateKey()
    //     };
        
    //     fs.writeFileSync(this.filePath, JSON.stringify(data));
    // }
    
    // /**
    //  * Load locally
    //  * 
    //  * @returns {string} The private key
    //  */
    // loadLocally() {
    //     const data = fs.readFileSync(this.filePath);
    //     return JSON.parse(data).key;
    // }
    
    // /**
    //  * Check if a file exists
    //  * 
    //  * @returns {bool} Whether the file exists or not
    //  */
    // fileExists() {
    //     return fs.existsSync(this.filePath);
    // }
}
