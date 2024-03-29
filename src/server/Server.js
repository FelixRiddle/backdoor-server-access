const cors = require('cors');
const express = require('express');

const serverRouter = require('./routes/index');
// const { envServerUrl } = require("../env/env");
const ConfMap = require("felixriddle.configuration-mappings");

/**
 * Server
 */
module.exports = class Server {
    constructor() {
        const app = express();
        this.app = app;
    }
    
    // --- Initialization ---
    /**
     * Start serving requests
     */
    async serve() {
        await this.setup();
        
        // Complete implementation of port(env, default and ephemeral) management
        const locSelector = new ConfMap.LocationSelection();
        await locSelector.selectLocation(this.app, 'backdoor-server-access');
    }
    
    // --- Setup ---
    /**
     * Setup all
     */
    async setup() {
        await this.setupMiddleware();
        
        this.mountRoutes();
    }
    
    /**
     * Mount routes
     */
    mountRoutes() {
        this.app.use(serverRouter);
    }
    
    /**
     * Enable CSP
     * 
     * TODO: Eval should be removed, but there's a package that uses it, I don't even know which one.
     * TODO: A lot of things should be banned, that's the point of CSP.
     */
    enableCsp() {
        // CSP policy
        let cspPolicy = (() => {
            // Array of allowed domains
            // Note that subdomains are disallowed by default, so you must set the star
            // to allow every subdomain.
            let allowedDomains = [
                "unpkg.com",
                "*.unpkg.com",
                "openstreetmap.org",
                "*.openstreetmap.org",
                "cloudflare.com",
                "*.cloudflare.com",
                "cdnjs.cloudflare.com",
                "geocode-api.arcgis.com",
                "cdn.jsdelivr.net",
                // My domains
                "*.perseverancia.com.ar",
                "perseverancia.com.ar",
            ];
            
            // Add domains to the list
            let domains = "";
            for(let domain of allowedDomains) {
                domains += `${domain} `;
            }
            
            // Unsafe things
            // let scriptSrc = `script-src ${domains}'self' 'unsafe-eval' 'unsafe-inline';`;
            // let styleSrc = `style-src ${domains}'self' 'unsafe-inline';`;
            // let defaultSrc = `default-src ${domains}'self' 'unsafe-eval' 'unsafe-inline';`;
            
            // A lil more safe
            let scriptSrc = `script-src ${domains}'self';`;
            let styleSrc = `style-src ${domains}'self';`;
            let imgSrc = `img-src ${domains}'self' data:;`;
            let defaultSrc = `default-src ${domains}'self';`;
            let fontAndFrame = "font-src 'self'; frame-src 'self';";
            
            let cspPolicy = `${fontAndFrame} ${defaultSrc} ${scriptSrc} ${styleSrc} ${imgSrc}`;
            
            return cspPolicy;
        })();
        
        // Set CSP
        this.app.use((req, res, next) => {
            res.setHeader(
                'Content-Security-Policy',
                cspPolicy
            );
            next();
        });
    }
    
    /**
     * Setup some things
     */
    async setupMiddleware() {
        this.enableCsp();
        
        // I don't know
        this.app.use(express.urlencoded({
            extended: true,
        }));
        
        // Json parser middleware
        this.app.use(express.json())
        
        // Cors whitelist
        let whitelist = [process.env.ORIGIN];
        
        // Add another one
        let new_origin = process.env.ORIGIN_1;
        if(new_origin) whitelist.push(new_origin);
        
        // --- Testing origins ---
        const good_roots_url = process.env.TEST_ORIGIN_1;
        if(good_roots_url) whitelist.push(good_roots_url);
        const express_auth_url = process.env.TEST_ORIGIN_2;
        if(express_auth_url) whitelist.push(express_auth_url);
        
        this.app.use(cors({
            origin: [
                ...whitelist,
            ]
        }));
    }
};
