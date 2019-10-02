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
			'asyncArrow': 'always'
		}]
	},
	env: {
		node: true,
		es6: true,
	},
	extends: 'airbnb-base',
	parser: 'babel-eslint',
};
