// Import the exec function from the child_process module
const exec = require('child_process').exec;

// Test suite for npm audit
describe('npm audit', () => {
    // Test that npm audit does not find any vulnerabilities
    test('should not find any vulnerabilities', done => {
        // Run npm audit and parse the output as JSON
        exec('npm audit --json', (error, stdout, stderr) => {
            const result = JSON.parse(stdout);

            // If there are any vulnerabilities, fail the test with an error message
            if (result.metadata.vulnerabilities.total > 0) {
                done(`npm audit found ${result.metadata.vulnerabilities.total} vulnerabilities`);
            } else {
                // If there are no vulnerabilities, pass the test
                expect(true).toBeTruthy();
                done();
            }
        });
    });
});