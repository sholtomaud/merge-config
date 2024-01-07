const test = require('tape');
const { minimistOptions } = require('../src/index'); // adjust path to your module if needed

test('minimistOptions generates correct options and help text', (t) => {
    try {
        const { options, helpText } = minimistOptions('./config/schema.json'); // replace with the path to your schema file

        // Check if the options object has the correct structure
        t.ok(options.hasOwnProperty('alias'));
        t.ok(options.hasOwnProperty('default'));
        t.ok(options.hasOwnProperty('string'));
        t.ok(options.hasOwnProperty('boolean'));

        // Check if the help text is a string
        t.equal(typeof helpText, 'string');
    } catch (err) {
        t.fail(err.message);
    }

    t.end();
});