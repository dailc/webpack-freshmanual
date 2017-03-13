require('../lib/css/mui.min.css');
require('../lib/js/mui.min.js');
require('../css/test.css')
require('../css/test2.css')
require('../css/style.css')
let CommonTools = require('CommonTools_Core');
console.log("~~~~~~~~~~~~~~~~~~~~");

document.getElementById('link').addEventListener('click',function(){
	window.location.href='pages/index2.html';
});

document.getElementById('link2').addEventListener('click',function(){
	window.location.href='pages/module/index3.html';
});