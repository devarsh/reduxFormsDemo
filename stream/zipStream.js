var fs = require('fs')

var rs = fs.createReadStream('./serve.js')
var ws = fs.createWriteStream('./message.json')

var gzip  = require('zlib').createGzip()

rs.pipe(gzip).pipe(ws).on('finish',()=>{console.log('Zip completed')})