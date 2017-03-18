module.exports = {
	// 是否上线,上线才会进行一些压缩等耗时工作
	isRelease: false,
	//web-dev-server有两种类型，iframe和inline，默认是iframe
	isInlineServer:false,
	isUseSourceMap:true,
	isAssetsJson:false,
	
	// 发布的路径，之所以写死路径，是用来解决webpack中的css路径引入问题
	//publicPath:'http://192.168.114.35:8020/wodenanjing/dist/',//hbuild服务器，无法自动刷新
	devPublicPath:'http://localhost:8080/dist/',//webpack-dev-server服务器
	releasePublicPath:'http://localhost:8080/dist/',
	// 本地的build路径
	buildPath: 'dist',
	//favicon路径
	favicon:'src/img/favicon.ico',
	// 是否抽取公共chunk-抽取后会有额外消耗，谨慎
	commonChunkConfig: {
		isCommonChunk: true,
		//同时引入超过几次(>=)后就会提取成公告文件
		minChunks:3,
		// 如果抽取，则抽取的公用文件为
		chunkName:'vendor/vendor',
		manifestName:'vendor/vendor.bundle'
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