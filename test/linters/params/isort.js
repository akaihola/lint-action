const Isort = require("../../../src/linters/isort");
const { TEST_DATE } = require("../../test-utils");

const testName = "isort";
const linter = Isort;
const commandPrefix = "";
const extensions = ["py"];

// Linting without auto-fixing
function getLintParams(dir) {
	const stdoutFile1 = `ERROR: ${dir} Imports are incorrectly sorted and/or formatted.\n--- ${dir}:before    ${TEST_DATE}\n+++ ${dir}:after     ${TEST_DATE}\\n@@ -1,20 +1,11 @@\\n-from my_lib import Object\\n+from __future__ import absolute_import\\n \\n import os\\n-\\n-from my_lib import Object3\\n-\\n-from my_lib import Object2\\n-\\n import sys\\n \\n-from third_party import lib15, lib1, lib2, lib3, lib4, lib5, lib6, lib7, lib8, lib9, lib10, lib11, lib12, lib13, lib14\\n-\\n-import sys\\n-\\n-from __future__ import absolute_import\\n-\\n-from third_party import lib3\\n+from my_lib import Object, Object2, Object3\\n+from third_party import (lib1, lib2, lib3, lib4, lib5, lib6, lib7, lib8, lib9,\\n+                         lib10, lib11, lib12, lib13, lib14, lib15)\\n \\n print("Hey")\\n print("yo")\\n`;
	return {
		// Expected output of the linting function
		cmdOutput: {
			status: 1,
			stdoutParts: [stdoutFile1],
			stdout: stdoutFile1,
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
					message: '-from my_lib import Object\n+from __future__ import absolute_import\n \n import os\n-\n-from my_lib import Object3\n-\n-from my_lib import Object2\n-\n import sys\n \n-from third_party import lib15, lib1, lib2, lib3, lib4, lib5, lib6, lib7, lib8, lib9, lib10, lib11, lib12, lib13, lib14\n-\n-import sys\n-\n-from __future__ import absolute_import\n-\n-from third_party import lib3\n+from my_lib import Object, Object2, Object3\n+from third_party import (lib1, lib2, lib3, lib4, lib5, lib6, lib7, lib8, lib9,\n+                         lib10, lib11, lib12, lib13, lib14, lib15)\n \n print("Hey")\n print("yo")'
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
			stdout: "",
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
