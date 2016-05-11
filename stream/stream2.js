var dataStream = []
var offset = 0;
process.stdin.on('readable', function () {
    var buf = process.stdin.read()
    if(!buf) return
    for (; offset < buf.length; offset++) {
        if(buf[offset] === 0x0a )
        {
            console.log(buf.slice(0,offset).toString())
            //dataStream = removeDupli(buf.slice(0,offset).toString())
            //console.log(dataStream)
            buf = buf.slice(offset + 1)
            offset = 0
            process.stdin.unshift(buf)
            return
        }
    }
    process.stdin.unshift(buf);
});


const removeDupli = (buf) => {
    var newBuf = buf.split('') 
    var prev = ''
    var res = newBuf.filter(cur => {
        var res = prev!=cur
        prev=cur
        return res
    })
    return res.join('')
}

const colsSeperate = (buf) => {
    var start = 0
    var buffer = []
    var length=0
    for(var offset=0;offset < buf.length;offset++)
    {
        if(buf[offset] === 0x20)
        {
            buffer.push(buf.slice(start,offset))
            start++
        }
    }
    return buffer
}