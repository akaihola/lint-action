const Isort = require("../../../src/linters/isort");

const testName = "isort";
const linter = Isort;
const commandPrefix = "";
const extensions = ["py"];

// Linting without auto-fixing
function getLintParams(dir) {
	return {
		// Expected output of the linting function
		cmdOutput: {
			status: 1,
		},
		// Expected output of the parsing function
		lintResult: {
			isSuccess: false,
			warning: [],
			error: [
				{
					path: 'file1.py',
					firstLine: 1,
					lastLine: 21,
					message:
						'-from my_lib import Object\n' +
						'+from __future__ import absolute_import\n' +
						' \n' +
						' import os\n' +
						'-\n' +
						'-from my_lib import Object3\n' +
						'-\n' +
						'-from my_lib import Object2\n' +
						'-\n' +
						' import sys\n' +
						' \n' +
						'-from third_party import lib15, lib1, lib2, lib3, lib4, lib5, lib6, lib7, lib8, lib9, lib10, lib11, lib12, lib13, lib14\n' +
						'-\n' +
						'-import sys\n' +
						'-\n' +
						'-from __future__ import absolute_import\n' +
						'-\n' +
						'-from third_party import lib3\n' +
						'+from my_lib import Object, Object2, Object3\n' +
						'+from third_party import (lib1, lib2, lib3, lib4, lib5, lib6, lib7, lib8, lib9,\n' +
						'+                         lib10, lib11, lib12, lib13, lib14, lib15)\n' +
						' \n' +
						' print("Hey")\n' +
						' print("yo")'
				},
			]
		},
	};
}

// Linting with auto-fixing
function getFixParams(dir) {
	return {
		// Expected output of the linting function
		cmdOutput: {
			status: 0,
		},
		// Expected output of the parsing function
		lintResult: {
			isSuccess: true,
			warning: [],
			error: [],
		},
	};
}

module.exports = [testName, linter, commandPrefix, extensions, getLintParams, getFixParams];
