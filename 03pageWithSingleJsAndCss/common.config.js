module.exports = {
	// 定义通用路径
	codeResource: './src',
	//定义的html
	htmlPages: [{
		template: 'index.html',
		chunks: ['index'],
	}, {
		template: 'index2.html',
		chunks: ['index2'],
	}]
};