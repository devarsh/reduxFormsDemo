var Transform = require('stream').Transform
var util = require('util')

function RevStream(options) {
	if(!(this instanceof RevStream)) {
		return new RevStream(options)
	}
	Transform.call(this,options)
}

util.inherits(RevStream,Transform)

RevStream.prototype._transform = function(chunk,encoding,callback) {
	this.push(chunk)
	callback()
}


var Ts = new RevStream()

process.stdin.resume()
process.stdin.pipe(Ts)

Ts.on('data',(chunk)=>{
	console.log(chunk.toString())
})