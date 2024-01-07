const fs = require('fs');
const Ajv = require('ajv');

module.exports = function (configFile, schemaFile, argv, callback) {
    // Check if files exist
    if (!fs.existsSync(configFile) || !fs.existsSync(schemaFile)) {
        callback(new Error('Config file or schema file does not exist'));
        return;
    }

    // Load the config.json file
    const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

    // Merge the config and input
    const mergedConfig = { ...config, ...argv };

    // Load the JSONSchema
    const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));

    // Create an instance of Ajv
    const ajv = new Ajv();

    // Validate the merged config against the JSONSchema
    const isValid = ajv.validate(schema, mergedConfig);

    if (!isValid) {
        callback(new Error('Merged config is not valid: ' + JSON.stringify(ajv.errors)));
        return;
    }

    callback(null, mergedConfig);
}