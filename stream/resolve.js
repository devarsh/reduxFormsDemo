var dns = require('dns')

dns.resolve4('www.google.com',(err,addr) => {
	if(!err) {
		console.log(`${JSON.stringify(addr)}`)
	}
})