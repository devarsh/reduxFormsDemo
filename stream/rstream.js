var fs = require('fs')
var stream = fs.createReadStream('./serve.js',{encoding:'utf-8'})

stream.on('data',(chunk) => {
	console.log(chunk)
})

stream.on('end',()=> {
	console.log('data ended')
})