const { minimistOptions } = require('../src/index'); // adjust path to your module if needed

describe('minimistOptions', () => {
    test('generates correct options and help text', () => {
        const { options, helpText } = minimistOptions('./config/schema.json'); // replace with the path to your schema file

        // Check if the options object has the correct structure
        expect(options).toHaveProperty('alias');
        expect(options).toHaveProperty('default');
        expect(options).toHaveProperty('string');
        expect(options).toHaveProperty('boolean');

        // Check if the help text is a string
        expect(typeof helpText).toBe('string');
    });
});