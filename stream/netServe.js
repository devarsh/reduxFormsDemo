var net = require('net')
var url = require('url')
var fs = require('fs')
var rs = fs.createReadStream('./serve.js')
var ws = fs.createWriteStream('./message.txt')

var clients = []
net.createServer((socket)=> {

	socket.name = socket.remoteAddress +':' + socket.remotePort
	clients.push(socket)
	socket.write("Welcome to tcp chat program")
	broadcast('connected:'+socket.name,socket)
	socket.on('data',(chunk)=> {
		broadcast(socket.name+':'+chunk,socket)
	})
	socket.on('end',()=>{
		clients.splice(clients.indexOf(socket),1);
		broadcast('disconnected:'+socket.name,socket)
	})

}).listen(8000,()=>{ 
	console.log('Web Server started at 8000')
})

function broadcast(message,sender) {
	clients.forEach(function(client){
		if(client===sender) return 
		client.write(message)
	})

	process.stdout.write(message)
}
	


