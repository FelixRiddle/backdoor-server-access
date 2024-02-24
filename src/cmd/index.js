const dotenv = require("dotenv");
const { ArgumentParser } = require("argparse");

const GeneralBackdoorAccessLocalStorage = require("../env/private/GenearlBackdoorAccessLocalStorage");

const checkAndRunServerCommands = require('./server');

// We will just use the default for now
dotenv.config({
    path: ".env.default"
});

const parser = new ArgumentParser({
    description: "Argparse example"
});

// --- Server ---
parser.add_argument("--serve", {
    help: "Start the server",
    action: "store_true"
});

// Parse arguments
let args = parser.parse_args();

(async () => {
    // Create folders and store keys
    const gnrl = new GeneralBackdoorAccessLocalStorage();
    gnrl.initialize();
    
    // Run server commands
    await checkAndRunServerCommands(args);
})();
