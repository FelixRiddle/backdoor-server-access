const Server = require("../server/Server");

/**
 * Start the server
 */
async function startServer() {
    const server = new Server()
    
    // Start serving
    await server.serve();
}

/**
 * 
 * @param {*} args 
 */
module.exports = async function checkAndRunServerCommands(args) {
    // Seed categories
    if(args.serve) {
        // Start server
        await startServer();
    }
}
