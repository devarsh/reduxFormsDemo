var fs = require('fs')
var rs = fs.createReadStream('message.json')
var ws = fs.createWriteStream('message.txt')
var startTime = Date.now()
var stopTime 

/*rs.on('data',(chunk)=>{
  var retval = ws.write(chunk,'utf8')
  if(retval===false && !rs.isPaused())
  {
    rs.pause()
  }
})

ws.on('drain',()=>{
  rs.resume()
})*/

rs.on('data',(chunk)=>{
  ws.write(chunk,'utf8')
})

//rs.pipe(ws)

ws.on('close',()=>{
  stopTime = Date.now()
  var totTime = (stopTime-startTime)/1024
  console.log('file copy completed in',totTime)
})

rs.on('end',()=>{
  ws.end()
})


