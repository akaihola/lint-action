const { run } = require("../utils/action");
const commandExists = require("../utils/command-exists");
const { parseErrorsFromDiff } = require("../utils/diff");
const { initLintResult } = require("../utils/lint-result");

/**
 * https://pycqa.github.io/isort
 */
class Isort {
	static get name() {
		return "isort";
	}

	/**
	 * Verifies that all required programs are installed. Throws an error if programs are missing
	 * @param {string} dir - Directory to run the linting program in
	 * @param {string} prefix - Prefix to the lint command
	 */
	static async verifySetup(dir, prefix = "") {
		// Verify that Python is installed (required to execute Black)
		if (!(await commandExists("python"))) {
			throw new Error("Python is not installed");
		}

		// Verify that isort is installed
		try {
			run(`${prefix} isort --version`, { dir });
		} catch (err) {
			throw new Error(`${this.name} is not installed`);
		}
	}

	/**
	 * Runs the linting program and returns the command output
	 * @param {string} dir - Directory to run the linter in
	 * @param {string[]} extensions - File extensions which should be linted
	 * @param {string} args - Additional arguments to pass to the linter
	 * @param {boolean} fix - Whether the linter should attempt to fix code style issues automatically
	 * @param {string} prefix - Prefix to the lint command
	 * @returns {{status: number, stdout: string, stderr: string}} - Output of the lint command
	 */
	static lint(dir, extensions, args = "", fix = false, prefix = "") {
		if (extensions.length !== 1 || extensions[0] !== "py") {
			throw new Error(`${this.name} error: File extensions are not configurable`);
		}

		const fixArg = fix ? "" : "--check --diff";
		return run(`${prefix} isort ${fixArg} ${args} .`, {
			dir,
			ignoreErrors: true,
		});
	}

	/**
	 * Parses the output of the lint command. Determines the success of the lint process and the
	 * severity of the identified code style violations
	 * @param {string} dir - Directory in which the linter has been run
	 * @param {{status: number, stdout: string, stderr: string}} output - Output of the lint command
	 * @returns {import('../utils/lint-result').LintResult} - Parsed lint result
	 */
	static parseOutput(dir, output) {
		const lintResult = initLintResult();
		const diff = output.stdout.split("\n").splice(2).join("\n") ? "" : output.stdout;
		lintResult.error = parseErrorsFromDiff(diff);
		console.log(`Got error ${JSON.stringify(lintResult)}`)
		for (let i = 0; i < lintResult.error.length; i += 1) {  // have to parse file name to strip trailing :after
			const { path } = lintResult.error[i];
			const pathEnd = path.lastIndexOf(":after");
			lintResult.error[i].path = path.slice(dir.length + 1, pathEnd);
		}
		lintResult.isSuccess = output.status === 0;
		console.log(`Got STDOUT ${output.stdout}\n\nSTDERR ${output.stderr}`)
		console.log(`Returning ${JSON.stringify(lintResult)}`)
		return lintResult;
	}
}

module.exports = Isort;
