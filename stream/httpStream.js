var http = require('http')
var spawn = require('child_process').spawn

var server = http.createServer((req,res) => {
	var ls = spawn('ls',['-lh','/usr/lib']);
	ls.stdout.pipe(res)
	setTimeout(()=>{ ls.stdout.unpipe(res) 
		res.end()
		ls.stdout.end()
	},2000)
	ls.stdout.on('error',()=>{})
}).listen(8000,()=>{
	console.log('started listening on 8000')
})