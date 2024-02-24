const ConfirmationEmailPrivateKey = require("../../../../env/private/privateKeyManager/ConfirmationEmailPrivateKey");
const BackendServerAccessAPI = require("../../../../api/BackendServerAccessAPI");
const { setupEnv } = require("../../../../env/env");

test("Email confirmation keys match", async () => {
    setupEnv();

    const emailPrivateKey = new ConfirmationEmailPrivateKey();
    const key = emailPrivateKey.loadLocally();
    
    // Fetch from the rest api
    const api = new BackendServerAccessAPI();
    const serverKey = await api.emailConfirmationKey();
    
    expect(key).toBe(serverKey);
});
