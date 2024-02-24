const BackendServerAccessAPI = require("./src/api/BackendServerAccessAPI");

const serverRouter = require("./src/server/routes");

module.exports = {
    // API
    BackendServerAccessAPI,
    
    // Express routes
    exprssRouter: serverRouter,
};
