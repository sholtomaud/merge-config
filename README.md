# Merge Config

> Assumes you are using minimist for cli options parsing.

## What?

A lib to merge items provided on command line and config.json file. 

## Why?

Because I needed a way to normalize command line switches and also provide an option to use a config file.

## Install

Currently this script is only hosted on GitHub so you install as follows:

**npm**

```sh
npm install git+https://github.com/sholtomaud/merge-config.git
```

**manual:** `package.json` 

```json
...
"dependencies": {
    "merge-config": "git+https://github.com/sholtomaud/merge-config.git#semver:^1.0.0"
}
...
```

## How to use

This module is used to merge a configuration file against a JSON schema and merge it with command-line arguments.

Here's an example of how to use it:

```js
const { mergeConfig } = require('merge-config');
const minimist = require('minimist');

// Parse command-line arguments
const argv = minimist(process.argv.slice(2));

// Merge configuration
try {
    const config = mergeConfig('./config/config.json', './config/schema.json', argv);
    console.log('Validated and merged config:', config);
} catch (error) {
    console.error('Error validating config:', error);
}

console.log(config);
```

In this example, mergeConfig is a function that takes three arguments:

The path to the configuration file (e.g., './config/config.json')
The path to the JSON schema file (e.g., './config/schema.json')
The command-line arguments parsed by minimist
The function returns the validated and merged configuration if the configuration is valid and successfully merged with the command-line arguments. If there's an error, it throws an exception.

```js
const { mergeConfig, minimistOptions } = require('merge-config');
const minimist = require('minimist');

// Generate options and help text from schema
const { options, helpText } = minimistOptions('./config/schema.json');

// Parse command-line arguments
const argv = minimist(process.argv.slice(2), options);

// Merge configuration
try {
    const config = mergeConfig('./config/config.json', './config/schema.json', argv);
    console.log('Validated and merged config:', config);
} catch (error) {
    console.error('Error validating config:', error);
}

console.log(helpText);
```

In this example, minimistOptions is a function that takes one argument:

The path to the JSON schema file (e.g., './config/schema.json')
The function returns an object with two properties:

options: An options object for minimist
helpText: A string containing the help text generated from the JSON schema
The options object is then passed to minimist when parsing the command-line arguments. The helpText is logged to the console at the end of the script.
