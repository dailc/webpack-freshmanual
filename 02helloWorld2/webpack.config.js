const path = require('path'); // 导入路径包
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: "./index.js", // 入口文件

	// 输出文件 build下的bundle.js
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: "bundle.js"
	},

	// 使用loader模块
	module: {
		loaders: [{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
//				loader: ExtractTextPlugin.extract(["style-loader","css-loader"])
			},
			{ test: /\.js$/, loader: "babel-loader", exclude: /node_modules/, query: { presets: ['es2015'] } }
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
			chunks: 'index.js',
		}),
		//这样会定义，所有js文件中通过require引入的css都会被打包成相应文件名字的css
		new ExtractTextPlugin("[name].css"),
	],
};