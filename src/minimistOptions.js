const fs = require('fs');

module.exports = function (schemaFile) {
    // Check if schema file exists
    if (!fs.existsSync(schemaFile)) {
        throw new Error('Schema file does not exist');
    }

    // Load the JSONSchema
    let schema;
    try {
        schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));
    } catch (err) {
        throw err;
    }

    // Extract the properties from the schema
    const properties = schema.properties;

    // Create an options object for minimist
    const options = {
        alias: {},
        default: {},
        string: [],
        boolean: []
    };

    // Generate the help text from the JSON Schema
    const helpText = [];

    // For each property in the schema, add it to the options object
    for (const property in properties) {
        const prop = properties[property];

        // If the property has an alias, add it to the alias options
        if (prop.alias) {
            options.alias[property] = prop.alias;
        }

        // If the property has a default value, add it to the default options
        if (prop.default) {
            options.default[property] = prop.default;
        }

        // If the property type is boolean, add it to the boolean options
        if (prop.type === 'boolean') {
            options.boolean.push(property);
        }

        // If the property type is string, add it to the string options
        if (prop.type === 'string') {
            options.string.push(property);
        }

        // Add the property to the help text
        helpText.push(`--${property}, -${prop.alias}\t${prop.description}`);


    }

    return { options, helpText: helpText.join('\n') };
}
// const fs = require('fs');
// const Ajv = require('ajv');

// // Map the JSON Schema properties to minimist options
// const options = {
//     alias: Object.keys(schema.properties).reduce((aliases, key) => {
//         if (schema.properties[key].alias) {
//             aliases[key] = schema.properties[key].alias;
//         }
//         return aliases;
//     }, {}),
//     default: Object.keys(schema.properties).reduce((defaults, key) => {
//         if (schema.properties[key].default) {
//             defaults[key] = schema.properties[key].default;
//         }
//         return defaults;
//     }, {})
// };

// // Generate the help text from the JSON Schema
// const helpText = Object.keys(schema.properties).map(key => {
//     const prop = schema.properties[key];
//     return `--${key}, -${prop.alias}\t${prop.description}`;
// }).join('\n');

// // Parse the arguments
// let args = minimist(process.argv.slice(2), options);

// // If the help option is set, display the help text and exit
// if (args.h || args.help) {
//     console.log(helpText);
//     process.exit(0);
// }

// // Validate the command-line arguments
// const ajv = new Ajv();
// const validate = ajv.compile(schema);
// let valid = validate(args);

// if (!valid) {
//     console.error('Invalid command-line arguments:', validate.errors);
//     process.exit(1);
// }

// // Now you can use args as before

// // module.exports = function (configFile, schemaFile, argv, callback) {
// //     // Check if files exist
// //     if (!fs.existsSync(configFile) || !fs.existsSync(schemaFile)) {
// //         callback(new Error('Config file or schema file does not exist'));
// //         return;
// //     }

// //     // Load the config.json file
// //     const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

// //     // Merge the config and input
// //     const mergedConfig = { ...config, ...argv };

// //     // Load the JSONSchema
// //     const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));

// //     // Create an instance of Ajv
// //     const ajv = new Ajv();

// //     // Validate the merged config against the JSONSchema
// //     const isValid = ajv.validate(schema, mergedConfig);

// //     if (!isValid) {
// //         callback(new Error('Merged config is not valid: ' + JSON.stringify(ajv.errors)));
// //         return;
// //     }

// //     callback(null, mergedConfig);
// // }