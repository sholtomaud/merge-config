# Merge Config

## What?

A lib to merge items provided on command line and config.json file. Assumes minimist is used.

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
const mergedConfig = require('merge-config');
const minimist = require('minimist');

// Parse command-line arguments
const argv = minimist(process.argv.slice(2));

// Merge configuration
const config = mergedConfig('./config/config.json', './config/schema.json', argv, (error, config) => {
    if (error) {
        console.error('Error validating config:', error);
    } else {
        console.log('Validated and merged config:', config);
    }
});

console.log(config);
```

In this example, validateConfig is a function that takes four arguments:

1. The path to the configuration file (e.g., './config/config.json')
2. The path to the JSON schema file (e.g., './config/schema.json')
3. The command-line arguments parsed by minimist
4. A callback function that takes two arguments: an error and the validated and merged configuration

If the configuration is valid and successfully merged with the command-line arguments, the callback function will be called with null as the first argument and the merged configuration as the second argument. If there's an error, the callback function will be called with the error as the first argument.