const glob = require('glob');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const generateHTMLPlugins = () => glob.sync('./src/**/*.html', { ignore: './src/partials/**' }).map(
	dir => new HTMLWebpackPlugin({
		filename: path.basename(dir), // Output
		template: dir, // Input
		minify: {
			removeComments: true,
			collapseWhitespace: true,
		},
	}),
);

module.exports = {
	node: {
		fs: 'empty',
	},
	resolve: {
		extensions: ['.ts', '.js', '.hbs'],
	},
	entry: ['./src/js/app.js', './src/style/main.scss'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
			},
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader',
				query: {
					partialDirs: path.join(__dirname, 'src', 'partials'),
				},
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					interpolate: true,
				},
			},
			{
				test: /\.(jpe?g|png|gif|svg|mp4)$/i,
				loader: 'file-loader',
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: './src/static/',
				to: './static/',
			},
		]),
		// new HTMLWebpackPlugin({
		//   template: 'src/index.hbs',
		//   // templateParameters: require(`./file.json`)
		// }),
		...generateHTMLPlugins(),
	],
	stats: {
		colors: true,
	},
	devtool: 'source-map',
};
