const test = require('tape');
const exec = require('child_process').exec;

test('npm audit', function (t) {
    exec('npm audit --json', (error, stdout, stderr) => {
        const result = JSON.parse(stdout);
        if (result.metadata.vulnerabilities.total > 0) {
            t.fail(`npm audit found ${result.metadata.vulnerabilities.total} vulnerabilities`);
        } else {
            t.pass('npm audit found no vulnerabilities');
        }
        t.end();
    });
});