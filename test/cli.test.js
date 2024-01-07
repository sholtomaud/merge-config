const test = require('tape');
const { mergeConfig } = require('../src/index'); // adjust path to your module if needed
const minimist = require('minimist');
const fs = require('fs');

test('mergeConfig with cli args', function (t) {
    const argv = minimist(['--name', 'Test', '--version', '1.0.0']);
    delete argv._;

    mergeConfig('./config/config.json', './config/schema.json', argv, (error, config) => {
        t.error(error, 'No error');
        t.ok(config, 'Config returned');

        // Read the config file
        const fileConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

        // Check if the returned config matches the file config
        t.deepEqual(config, fileConfig, 'Returned config matches file config');

        t.end();
    });
});