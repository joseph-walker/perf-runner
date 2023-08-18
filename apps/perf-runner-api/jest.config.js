module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		"\\.[jt]s?$": "babel-jest"
		// '^.+\\.(t|j)sx?$': [
		// 	'@swc/jest',
		// 	{
		// 		jsc: {
		// 			parser: {
		// 				syntax: 'typescript',
		// 				decorators: true,
		// 			},
		// 			transform: {
		// 				legacyDecorator: true,
		// 				decoratorMetadata: true,
		// 			},
		// 		},
		// 	},
		// ],
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: '../coverage',
	testEnvironment: 'jest-environment-node',
};
