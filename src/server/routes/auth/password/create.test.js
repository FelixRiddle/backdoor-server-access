const BackendServerAccessAPI = require("../../../../api/BackendServerAccessAPI");
const { setupEnv } = require("../../../../env/env");
const ResetPasswordPrivateKey = require("../../../../env/private/privateKeyManager/ResetPasswordPrivateKey");

test("Password private keys match", async () => {
    setupEnv();

    const privateKeyManager = new ResetPasswordPrivateKey();
    const key = privateKeyManager.loadLocally();
    
    // Fetch from the rest api
    const api = new BackendServerAccessAPI();
    const serverKey = await api.createPasswordKey();
    
    expect(key).toBe(serverKey);
});
