const fs = require('fs');
const Ajv = require('ajv');

module.exports = function (configFile, schemaFile, argv) {
    // Check if files exist
    if (!fs.existsSync(configFile) || !fs.existsSync(schemaFile)) {
        throw new Error('Config file or schema file does not exist');
    }

    // Load the config.json file
    const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

    // Merge the config and input
    const mergedConfig = { ...config, ...argv };

    // Load the JSONSchema
    const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));

    // Create an instance of Ajv
    const ajv = new Ajv();

    // Validate the data
    const validate = ajv.compile(schema);
    const valid = validate(mergedConfig);

    if (!valid) {
        validate.errors.forEach(err => {
            if (err.keyword === 'enum') {
                console.error(`Error: The value for ${err.instancePath.replace('/', '')} must be one of the following: ${err.params.allowedValues.join(', ')}`);
            } else {
                console.error(`Error: ${err.message}`);
            }
        });

        throw new Error('Merged config is not valid.');
    }

    return mergedConfig;
}