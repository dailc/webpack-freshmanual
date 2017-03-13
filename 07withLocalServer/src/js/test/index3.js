require('../../lib/css/mui.min.css');
require('../../lib/js/mui.min.js');
require('../../css/test.css')

if(window.mui) {
	mui.ready(function(){
		console.log("mui ready");
	});
}
