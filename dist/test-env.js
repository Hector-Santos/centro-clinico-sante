const env = process.env.ADMIN_ENV;
if (env === 'prod') {
    console.log('[TEST] ADMIN_ENV is set to "prod" ✅');
}
else if (env === 'dev') {
    console.log('[TEST] ADMIN_ENV is set to "dev" ✅');
}
else if (env === undefined) {
    console.log('[TEST] ADMIN_ENV is not set ⚠️');
}
else {
    console.log(`[TEST] ADMIN_ENV is "${env}" (unexpected value) ❓`);
}
//# sourceMappingURL=test-env.js.map