const fs = require('fs');
const Ajv = require('ajv');

module.exports = function (configFile, schemaFile, argv) {

    delete argv._; // Remove the _ property from the argv object (minimist adds this for arguments without a flag)

    // Check if argv is empty
    const isArgvEmpty = Object.keys(argv).length === 0;

    // Check if configFile exists
    const doesConfigFileExist = fs.existsSync(configFile);

    // If argv is empty and configFile does not exist, throw an error
    if (isArgvEmpty && !doesConfigFileExist) {
        throw new Error('Config file does not exist and no arguments were provided');
    }

    // Load the config.json file if it exists
    const config = doesConfigFileExist ? JSON.parse(fs.readFileSync(configFile, 'utf8')) : {};

    // Merge the config and input
    const mergedConfig = { ...config, ...argv };

    // Check if schema file exists
    if (!fs.existsSync(schemaFile)) {
        throw new Error('Schema file does not exist');
    }

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