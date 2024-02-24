const { ArgumentParser } = require("argparse");

const createPrivateKeyDirectories = require("../env/private/createPrivateKeyDirectories");

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
    createPrivateKeyDirectories();
    console.log('Folders created!');
    
    // await serverMain(args);
})();
