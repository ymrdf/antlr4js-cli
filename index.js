#!node

var child_process = require('child_process');
var path = require('path');
var process = require('process');


var haveDlanguage = process.argv.find((item) => item.indexOf('-Dlanguage=') === 0)

var cmd = 'java';
var value = ['-jar', path.join(__dirname, 'assets/antlr-4.10.1-complete.jar')]
    .concat(haveDlanguage?[]:['-Dlanguage=JavaScript'])
    .concat(process.argv.slice(2));
var opt = {stdio: "inherit"};
var child = child_process.spawn(cmd, value, opt);


child.on('close', function (code) {
	process.exitCode = code;
    code && console.log("child process exited with code ", code);
});
