module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:prettier/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:sonarjs/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		"max-len": ["error", { code: 250 }],
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		semi: ["error", "always"],
		"import/order": [
			"error",
			{
				groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
			},
		],
		"import/no-unresolved": ["error", { ignore: ["^@/"] }],
		quotes: ["error", "single", { allowTemplateLiterals: true }],
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
			},
		],
	},

	overrides: [
		{
			files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
			env: {
				jest: true,
			},
		},
	],
};
