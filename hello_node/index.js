/* 引用http模块 */
const http = require("http")
/* 创建http服务器并将该服务器赋值给变量server*/
const server = http.createServer()

const sayHello = (req, res) => {
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.write('<head><meta charset="utf-8"/></head>');
  res.end("Hello World!")
}

/* 触发request事件绑定事件处理函数sayHello*/
server.on("request", sayHello)

/* 使用package.json中定义的端口，如果没有定义就使用3000*/
var port = process.env.npm_package_config_port || 3000
server.listen(port, "127.0.0.1")

console.log("Node app is running at localhost:" + port)
