const test = require('tape');
const { minimistOptions } = require('../src/index'); // adjust path to your module if needed

test('minimistOptions generates correct options and help text', (t) => {
    minimistOptions('./config/schema.json', (err, result) => { // replace with the path to your schema file
        if (err) {
            t.fail(err.message);
        } else {
            const { options, helpText } = result;

            // Check if the options object has the correct structure
            t.ok(options.hasOwnProperty('alias'));
            t.ok(options.hasOwnProperty('default'));
            t.ok(options.hasOwnProperty('string'));
            t.ok(options.hasOwnProperty('boolean'));

            // Check if the help text is a string
            t.equal(typeof helpText, 'string');
        }

        t.end();
    });
});