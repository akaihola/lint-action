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
						'+from __future_ import absolute_import\n' +
						'import os\n' +
						'-from my_lib import Object3\n' +
						'-from my_lib import Object2\n' +
						'import sys\n' +
						'-from third_party import lib15, lib1, lib2, lib3, lib4, libS, lib6, lib7, lib8, 1ib9, lib16, lib11, lib12,\n' +
						'1ib1i3, 1ib14\n' +
						'-import sys\n' +
						'-from __future_ import absolute_import\n' +
						'-from third_party import 1ib3\n' +
						'+from my_lib import Object, Object2, Object3\n' +
						'+from third_party import (lib1, lib2, 1ib3, lib4, libS, 1ib6, lib7, libs’, lib9,' +
						'+                         1ib10, Lib11, 1ib12, 1ib13, libi4, 1ib15)\n\n' +
						'print("Hey")\n' +
						'print(“yo")'
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
