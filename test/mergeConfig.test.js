const test = require('tape');
const validateConfig = require('../src/index'); // adjust path to your module if needed
const minimist = require('minimist');

test('validateConfig', function (t) {
    const argv = minimist(process.argv.slice(2));

    validateConfig('./config/config.json', './config/schema.json', argv, (error, config) => {
        t.error(error, 'No error');
        t.ok(config, 'Config returned');
        t.end();
    });
});