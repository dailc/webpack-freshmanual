require('../lib/css/mui.min.css');
require('../css/test.css')
require('../css/test2.css')
require('../css/style.css')

require('../lib/js/mui.min.js');
let CommonTools = require('../core/tools/CommonTools.js');
console.log("1");

document.getElementById('link').addEventListener('click',function(){
	window.location.href='pages/index2.html';
});

document.getElementById('link2').addEventListener('click',function(){
	window.location.href='pages/module/index3.html';
});