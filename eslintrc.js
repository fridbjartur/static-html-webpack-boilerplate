module.exports = {
	root: true,
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		quotes: ['error', 'single', { allowTemplateLiterals: true }],
		semi: ['error', 'always'],
		'comma-dangle': ['warn', 'always-multiline'],
		'no-console': ['warn'],
		'no-unused-vars': ['warn'],
		'space-before-function-paren': ['error', {
			'anonymous': 'never',
			'named': 'never',
			'asyncArrow': 'always',
		}],
	},
	'parser': 'babel-eslint',
	'env': {
		'browser': true,
		'es6': true,
	},
	'presets': [['env', { 'targets': { 'node': 'current' } }]],
	extends: 'eslint:recommended',
};
