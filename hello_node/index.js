var http = require('http');

/* 使用package.json中定义的端口，如果没有定义就使用3000*/
var port = process.env.npm_package_config_port ||3000;

http.createServer(function(req, res) {
	// res.writeHead(200, {'Content-Type': 'text/html'});
	// res.write('<head><meta charset="utf-8"/></head>');
	res.end('Hello World!');
}).listen(port, "127.0.0.1");

console.log("Node app is running at localhost:" + port);