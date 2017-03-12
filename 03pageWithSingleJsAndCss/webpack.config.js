const path = require('path'); // 导入路径包
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlPagePluginConfig = require('./htmlpage.config.js');
const codeResource = require('./common.config.js').codeResource;

// 找需要编译的路径
let entry = {};
let bannerExcludeFiles = [];

function walk(dir, root) {
	root = root || './';
	dir = dir || '';
	let directory = path.join(__dirname, root, dir);
	fs.readdirSync(directory)
		.forEach(function(file) {
			let fullpath = path.join(directory, file);
			let stat = fs.statSync(fullpath);
			let extname = path.extname(fullpath);
			if(stat.isDirectory() && file !== 'core' && file !== 'lib' && file !== 'static') {
				let subdir = path.join(dir, file);
				walk(subdir, root);
			} else if(stat.isFile() && (extname === '.js')) {
				let name = path.join(dir, path.basename(file, extname));
				name = name.replace(/\\/g, '/');
				entry[name] = fullpath;
				console.log("js文件:" + name);

			}
		});
}

walk('./', codeResource);

// 合并css与html的插件
let plugins = htmlPagePluginConfig.plugin.concat([
	//这样会定义，所有js文件中通过require引入的css都会被打包成相应文件名字的css
	new ExtractTextPlugin("[name].css"),
]);

module.exports = {
	entry: entry, // 入口文件

	// 输出文件 build下的bundle.js
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].js"
	},

	// 使用loader模块
	module: {
		loaders: [{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{ test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ }
		],
	},
	plugins: plugins,
};