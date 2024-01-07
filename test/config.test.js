const test = require('tape');
const validate = require('../src/index'); // adjust path to your module if needed
const minimist = require('minimist');
const fs = require('fs');

test('validate with config file', function (t) {
    const argv = minimist([]);
    delete argv._;

    validate('./config/config.json', './config/schema.json', argv, (error, config) => {
        t.error(error, 'No error');
        t.ok(config, 'Config returned');

        // Read the config file
        const fileConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

        // Check if the returned config matches the file config
        t.deepEqual(config, fileConfig, 'Returned config matches file config');

        t.end();
    });
});