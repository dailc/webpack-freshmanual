require('./test.css')
require('./test2.css')
require('./style.css')
let CommonTools = require('./core/tools/CommonTools.js');
console.log("1");

document.getElementById('link').addEventListener('click',function(){
	window.location.href='index2.html';
});