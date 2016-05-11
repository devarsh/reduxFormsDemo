var Duplex = require('stream').Duplex
var util = require('util')
function TimeStream(options) {
	if(!(this instanceof TimeStream)) {
		return new TimeStream(options)
	}
	Duplex.call(this,options)
	this.chunk = ''
	this.pushNeeded = false
}
util.inherits(TimeStream,Duplex)

TimeStream.prototype._read = function() {
	if(this.pushNeeded) {
		this.pushNeeded = false
		this.push(this.chunk)
	}
}
TimeStream.prototype._write = function(chunk,encoding,callback) {
		this.chunk = chunk
		this.pushNeeded = true
		this._read()
		callback()
}

var Timer = new TimeStream()



Timer.on('data',(chunk)=> {
	console.log('From Readable',chunk.toString())
})

process.stdin.resume()
process.stdin.pipe(Timer)
