var stream = require('stream')

function StreamCache()
{
	stream.call(this)
	this.writable = true
	this.readable = true
	this.buffer = []
	this.dest = []
}
