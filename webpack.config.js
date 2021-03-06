const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = env => {
	env = env || {};
	return {
		entry: './index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'main.bundle.js'
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'index.html'
			})

		]
	};
};