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

You can use it in your script like this:

```js
const mergeConfig = require('merge-config');
const minimist = require('minimist');

// Parse command line arguments
const argv = minimist(process.argv.slice(2));

// Path to config file
const configFile = './config.json';

// Merge command line arguments and file config
const config = mergeConfig(argv, configFile);

console.log(config);
```

In this example, mergeConfig is used to merge the command line arguments (parsed by minimist) and the configuration loaded from a config.json file. The resulting config object contains the merged configuration.

## Documentation

mergeConfig(argv, configFile)

* argv: An object containing the parsed command line arguments. Typically, this is the result of minimist(process.argv.slice(2)).
* configFile: A string containing the path to the configuration file.

Returns: An object containing the merged configuration. If the same key exists in both argv and configFile, the value from argv is used.