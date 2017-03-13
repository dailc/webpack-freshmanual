require('../lib/css/mui.min.css');
require('../lib/js/mui.min.js');
require('../css/test2.css')

if(window.mui) {
	mui.ready(function(){
		console.log("mui ready");
	});
}
console.log("window.mui:"+window.mui);