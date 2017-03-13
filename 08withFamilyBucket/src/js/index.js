require('../lib/css/mui.min.css');
require('../lib/js/mui.min.js');
require('../css/test.css')
require('../css/test2.css')
require('../css/style.css')
let CommonTools = require('CommonTools_Core');
console.log("11");

document.getElementById('link').addEventListener('click', function() {
	window.location.href = 'index2.html';
});

document.getElementById('link2').addEventListener('click', function() {
	window.location.href = 'index3.html';
});

mui.ajax('http://localhost:8888/process_post', {
	data: {},
	dataType: "json",
	timeout: "9000",
	type: "POST",

	success: function(response) {
		console.log("success:" + JSON.stringify(response));
		document.getElementById('result').innerHTML='请求成功:'+JSON.stringify(response);
		throw '测试错误';
	},
	error: function(error) {
		console.log("error");
		console.log(JSON.stringify(error))
		document.getElementById('result').innerHTML='请求失败:'+JSON.stringify(error);
	}
});