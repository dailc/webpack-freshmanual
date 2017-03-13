module.exports = {
	// 是否上线,上线才会进行一些压缩等耗时工作
	isRelease: true,
	//web-dev-server有两种类型，iframe和inline，默认是iframe
	isInlineServer:false,
	// 发布的路径，之所以写死路径，是用来解决webpack中的css路径引入问题
	//publicPath:'http://192.168.114.35:8020/wodenanjing/dist/',//hbuild服务器，无法自动刷新
	publicPath:'http://localhost:8080/dist/',//webpack-dev-server服务器
	// 本地的build路径
	buildPath: 'dist',
	// 是否抽取公共chunk-抽取后会有额外消耗，谨慎
	commonChunkConfig: {
		isCommonChunk: true,
		//同时引入超过几次(>=)后就会提取成公告文件
		minChunks:3,
		// 如果抽取，则抽取的公用文件为
		chunkName:'common/vendor',
		manifestName:'common/vendor.bundle'
	},
	// 定义通用路径
	codeResource: './src',
	// 定义html页面配置,定义每一个html应该引入的JS文件
	htmlPages: [{
		template: 'pages/index.html',
		chunks: ['js/index'],
	}, {
		template: 'pages/index2.html',
		chunks: ['js/index2'],
	}, {
		template: 'pages/test/index3.html',
		chunks: ['js/test/index3'],
	}],
	
};