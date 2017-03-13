module.exports = {
	// 定义通用路径
	codeResource: './src',
	// 本地的build路径
	buildPath: 'dist',
	//请改成对应的publicPath
	publicPath:'http://localhost:8080/dist/',//hbuild服务器，无法自动刷新
	// 是否抽取公共chunk-抽取后会有额外消耗，谨慎
	commonChunkConfig: {
		isCommonChunk: true,
		//同时引入超过几次(>=)后就会提取成公告文件
		minChunks:3,
		// 如果抽取，则抽取的公用文件为
		chunkName:'common/vendor',
		manifestName:'common/vendor.bundle'
	},
	// 定义html页面配置,定义每一个html应该引入的JS文件
	htmlPages: [{
		template: 'pages/index.html',
		// 路径一定要对
		chunks: ['js/index'],
	}, {
		template: 'pages/index2.html',
		chunks: ['js/index2'],
	}, {
		template: 'pages/module/index3.html',
		chunks: ['js/module/index3'],
	}],
	
};