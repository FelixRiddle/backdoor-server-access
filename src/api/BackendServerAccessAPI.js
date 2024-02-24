const axios = require("axios");

const { envServerUrl } = require("../env/env");

module.exports = class BackendServerAccessAPI {
    constructor() {
        this.url = envServerUrl();
        this.setInstance();
    }
    
    /**
     * Get email confirmation key
     */
    async emailConfirmationKey() {
        const url = `${this.url}/auth/email/email_confirmation`;
        
        const res = await this.instance.get(url)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.error(err);
            });
        
        return res.data.key;
    }
    
    /**
     * Set axios instance
     */
    setInstance() {
        // Create headers
        let headers = {
            "Content-Type": "application/json"
        };
        
        this.instance = axios.create({
            baseURL: this.url,
            timeout: 2000,
            headers,
        });
    }
};
