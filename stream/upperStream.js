var Transform = require('stream').Transform
var util = require('util')
var fs = require('fs')



function Upper(options) {
	if(!(this instanceof Upper)) {
		return new Upper(options)
	}
	Transform.call(this,options)
}

util.inherits(Upper,Transform)


Upper.prototype._transform = function(chunk,enc,cb)
{
	this.push(chunk.toString().toUpperCase())
	cb()

}


var upper = Upper()
var rs=fs.createReadStream('./serve.js')
var ws=fs.createWriteStream('./message.txt')

rs.pipe(upper).pipe(ws)
