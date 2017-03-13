// 本地express服务器
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('dist/static'));

//设置跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	if(req.method == 'OPTIONS') {
		console.log("OPTIONS请求");
		//让options请求快速返回
		res.sendStatus(200); 
	} else { 
		console.log("请求:"+req.method);
		next(); 
	}
});

app.get('/test.jpg', function(req, res) {
	res.sendFile(__dirname + "/src/img/" + "img_test.jpg");
})

app.post('/process_post', urlencodedParser, function(req, res) {
	console.log("进入post请求:");
	// 输出 JSON 格式
	response = {
		first_name: req.body.first_name,
		last_name: req.body.last_name
	};
	response.out = 'test';
	console.log(response);
	res.end(JSON.stringify(response));
})

var server = app.listen(8888, function() {

	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})