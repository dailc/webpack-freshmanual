module.exports = {
	// 定义通用路径
	codeResource: './src',
	//请改成对应的publicPath
	publicPath:'http://localhost:8080/dist/',//hbuild服务器，无法自动刷新
	//定义的html
	htmlPages: [{
		template: 'pages/index.html',
		// 路径一定要对
		chunks: ['js/index'],
	}, {
		template: 'pages/index2.html',
		chunks: ['js/index2'],
	}]
};