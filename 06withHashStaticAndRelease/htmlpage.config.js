// 定义一些html页面以及相应的引用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./common.config.js');
const codeResource = config.codeResource;


let htmlPages = config.htmlPages;


function generatePlugins(htmlPages){
	if(!htmlPages) {
		return [];
	}
	let plugins = [];
	for(let i = 0, len = htmlPages.length; i < len; i++) {
		if(config.commonChunkConfig.isCommonChunk) {
			//如果抽取了chunk,添加到前面
			htmlPages[i].chunks.unshift(config.commonChunkConfig.chunkName);
			htmlPages[i].chunks.unshift(config.commonChunkConfig.manifestName);
		}
		plugins.push(new HtmlWebpackPlugin({
			template: codeResource + '/'+htmlPages[i].template,
			filename: htmlPages[i].template,
			chunks: htmlPages[i].chunks,
			minify: config.isRelease?{
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				minifyJS: true,
				minifyCSS: true
			}:null,
			//hash: true
		}));
	}
	
	return plugins;
}

module.exports = {
	// 定义html
	plugin: generatePlugins(htmlPages)
};