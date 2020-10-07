module.exports = {
	env: {
		browser: true,
		es6: true,
		jest: true,
		node: true
	},
	parser: 'babel-eslint',
	extends: ['airbnb', 'prettier', 'prettier/react'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
			modules: true
		},
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	plugins: ['react', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'react/destructuring-assignment': 0,
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'react/forbid-prop-types': [0, { forbid: ['any'] }],
		'react/prop-types': 0,
		'react/no-array-index-key': 0
	}
};
