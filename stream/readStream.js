var Readable = require('stream').Readable
var util = require('util')


function MyFn(options) {
	this.counter=0;
	this.ret = true
	Readable.call(this,options)
}

util.inherits(MyFn,Readable)

MyFn.prototype._read = function() {
	if(this.ret === true && this.counter < 100) {
		this.ret = this.push('abcdefghijklmnopqrstuvwxyz')
		this.counter++
	}
	else {
		this.push(null)
	}
}




var rs = new MyFn()

rs.on('data',(chunk)=>{
	console.log(chunk)
})

rs.on('close',()=>{
	console.log('stream closed')
})