var crypto = require('crypto')
var fs = require('fs')

var rs = fs.createReadStream('./serve.js')
var ws = fs.createWriteStream('./message.txt')

var password = new Buffer('my secret');
var aes = crypto.createCipher('aes-256-cbc', password);

rs   // reads from myfile.txt
  .pipe(aes)  // encrypts with aes256
  .pipe(ws)  // writes to myfile.encrypted
  .on('finish', function () {  // finished
    console.log('done encrypting');
  });

 