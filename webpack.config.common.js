// Set to true if you want to export without specific plugin.
const disableFavicons = true;
const disableHandlebars = true;

// Function to disable plugin.
function DisablePlugin() {
	this.apply = function() { };
}

const glob = require('glob');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
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
				exclude: /node_modules/,
				options: {
					presets: ['@babel/preset-env'],
				},
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
				ignore: 'favicon.*',
			},
		]),
		disableHandlebars ? new DisablePlugin() : new HTMLWebpackPlugin({
			template: 'src/index.hbs',
			// templateParameters: require(`./file.json`)
		}),
		...generateHTMLPlugins(),
		disableFavicons ? new DisablePlugin() : new FaviconsWebpackPlugin({
			logo: './src/static/favicon.png',
			cache: true,
			outputPath: './static/',
			// Prefix path for generated assets
			prefix: './static/',
			inject: false,

			// Favicons configuration options
			favicons: {
				appName: 'my-app',
				appDescription: 'My awesome App',
				developerName: 'MIDBERG',
				developerURL: null, // prevent retrieving from the nearest package.json
				background: '#fff',
				theme_color: '#fff',
				icons: {
					coast: false,
					yandex: false,
				},
			},
		}),
	],
	stats: {
		colors: true,
	},
	devtool: 'source-map',
};
