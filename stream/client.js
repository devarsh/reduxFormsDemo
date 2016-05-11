var net = require('net')
var sock = net.connect({port:8000},()=>{
	 	process.stdin.resume()
	 	process.stdin.pipe(sock)
	})
	sock.on('data',(chunk)=>{
		console.log(sock.name+chunk.toString())
	})