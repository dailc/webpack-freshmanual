// 定义一些html页面以及相应的引用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./common.config.js');
const codeResource = require('./common.config.js').codeResource;

let htmlPages = config.htmlPages;


function generatePlugins(htmlPages){
	if(!htmlPages) {
		return [];
	}
	let plugins = [];
	for(let i = 0, len = htmlPages.length; i < len; i++) {
		plugins.push(new HtmlWebpackPlugin({
			template: codeResource +'/'+ htmlPages[i].template,
			filename: 'pages/'+htmlPages[i].template.substr(htmlPages[i].template.lastIndexOf('/')+1),
			chunks: htmlPages[i].chunks,
			minify: {
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				minifyJS: true,
				minifyCSS: true
			},
			//暂时不要这种hash算法
			//hash: true
		}));
	}
	
	return plugins;
}

module.exports = {
	// 定义html
	plugin: generatePlugins(htmlPages)
};