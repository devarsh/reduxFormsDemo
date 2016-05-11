var http = require('http')
var net = require('net')
var url = require('url')
var fs = require('fs')
var ws = fs.createWriteStream('./message.txt')

var proxy = http.createServer((req,res)=>{
	res.writeHead(200,{'Content-Type':'text/plain'})
	res.end('Okay')
})

proxy.on('connect',(req,cltSocket,head)=> {

	var srvUrl = url.parse(`http://${req.url}`);
	var srvSocket = net.connect(srvUrl.port,srvUrl.hostname,()=> {
		cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    	'Proxy-agent: Node.js-Proxy\r\n\r\n');
		
		srvSocket.pipe(cltSocket).pipe(srvSocket)
	})
})

proxy.listen(1337,'127.0.0.1',()=> {
	var options = {
    port: 1337,
    hostname: '127.0.0.1',
    method: 'CONNECT',
    path: 'www.google.co.in:80'
  	};

	var req = http.request(options);
	req.end()

	req.on('connect', (res, socket, head) => {
		// make a request over an HTTP tunnel
		socket.write('GET / HTTP/1.1\r\n' +
	             'Host: www.google.com:80\r\n' +
	             'Connection: close\r\n' +
	             '\r\n')
		socket.on('data', (chunk) => {
	  		console.log(chunk.toString())
		})
		socket.on('end', () => {
			proxy.close()
		})
	})
})


