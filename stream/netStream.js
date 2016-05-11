var fs = require('fs')

var image = fs.createReadStream('./image.jpg')
var writeBase64 = fs.createWriteStream('./message.json')
var myBuf = [] 
image.on('data',(chunk)=>{
	myBuf.push(chunk)
})

image.on('end',()=>{
	var tot = Buffer.concat(myBuf)
	writeBase64.write(tot.toString('base64'))
	writeBase64.end()
})

