const { mergeConfig } = require('../src/index'); // adjust path to your module if needed
const minimist = require('minimist');
const fs = require('fs');

// Test suite for mergeConfig function
describe('mergeConfig with cli args', () => {
    // Test that mergeConfig correctly merges CLI arguments with the config file
    test('should return correct config', () => {
        // Parse CLI arguments
        const argv = minimist(['--name', 'Test', '--version', '1.0.0']);
        delete argv._;

        try {
            // Merge CLI arguments with the config file
            const config = mergeConfig('./config/config.json', './config/schema.json', argv);

            // Check if the config object is not null or undefined
            expect(config).toBeTruthy();

            // Read the config file
            const fileConfig = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

            // Check if the returned config matches the file config
            expect(config).toEqual(fileConfig);
        } catch (error) {
            // If an error is thrown, fail the test with the error message
            throw new Error('Error thrown: ' + error.message);
        }
    });
});