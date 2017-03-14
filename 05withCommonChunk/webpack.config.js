const path = require('path'); // 导入路径包
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlPagePluginConfig = require('./htmlpage.config.js');
const codeResource = require('./common.config.js').codeResource;
const webpack = require('webpack');
const config = require('./common.config.js');

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
			if(stat.isDirectory() && file !== 'Tools') {
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
	// 这样会定义，所有js文件中通过require引入的css都会被打包一个css
	// 默认这个css命名为对应文件
	new ExtractTextPlugin("[name].css"),
	// 压缩js
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
]);

// 如果有配置抽取公共文件
if(config.commonChunkConfig.isCommonChunk) {
	let chunkPlugins = [
		// 抽取公用模块
		new webpack.optimize.CommonsChunkPlugin({
			name: config.commonChunkConfig.chunkName,
			// 至少出现三次以上才抽取
			minChunks: config.commonChunkConfig.minChunks
		}),
		new webpack.optimize.CommonsChunkPlugin({
			// https://www.zhihu.com/question/31352596/answer/127369675?from=profile_answer_card
			name: config.commonChunkConfig.manifestName,
			chunks: [config.commonChunkConfig.chunkName]
		}),
	];

	plugins = plugins.concat(chunkPlugins);
}

module.exports = {
	entry: entry, // 入口文件
	// 输出文件 build下的bundle.js
	output: {
		// 用来解决css中的路径引用问题
		publicPath: config.publicPath,
		path: path.resolve(__dirname, config.buildPath),
		// 注意要使用chunkhash
		filename: "[name].js"
	},

	// 使用loader模块
	module: {
		loaders: [{
			// 分为压缩的和非压缩的，不会重复，否则可能会报错
			// 包含css 但却不包含.min.css的
			test: /^((?!\.min\.css).)*\.css/,
			loader: ExtractTextPlugin.extract({
				fallback: "style-loader",
				// 压缩css
				use: "css-loader?minimize&-autoprefixer"
			})
		}, {
			// 包含css 包含.min.css的
			test: /\.min\.css/,
			loader: ExtractTextPlugin.extract({
				fallback: "style-loader",
				// 不压缩css
				use: "css-loader"
			})
		}, {
			test: /\.(png|jpg|gif)$/,
			//小于1k的会默认用b64实现
			loader: 'url-loader?limit=1024&name=img/[name].[ext]'
		}, {
			test: /\.woff/,
			loader: 'file-loader?prefix=font/&limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
		}, {
			test: /\.ttf|\.svg|\.eot/,
			loader: 'file-loader?prefix=font/&name=fonts/[name].[ext]'
		}, {
			test: /\.js$/,
			loader: "babel-loader",
			exclude: /node_modules/,
			query: {
				//必须手动指定，否则可能会出错，比如压缩时会出错
				presets: ['es2015']
			}
		}],
	},
	plugins: plugins,
	//dev版才有serve
	devServer: {
		historyApiFallback: true,
		hot: false,
		//不使用inline模式,inline模式一般用于单页面应用开发，会自动将socket注入到页面代码中
		inline: false,
		//content-base就是 codeResource -需要监听源码
		contentBase: path.resolve(__dirname, config.codeResource),
		watchContentBase: true,
		// 默认的服务器访问路径，这里和配置中一致，需要提取成纯粹的host:ip
		public: /https?:\/\/([^\/]+?)\//.exec(config.publicPath)[1]
	},
};