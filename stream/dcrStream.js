var crypto = require('crypto')
var fs = require('fs')

var ws = fs.createWriteStream('./messageDcr.js')
var rs = fs.createReadStream('./message.txt')

var password = new Buffer('my secret');
var aes = crypto.createDecipher('aes-256-cbc',password);

rs.pipe(aes).pipe(ws)