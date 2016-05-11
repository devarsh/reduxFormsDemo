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
        if(buf[offset] === ' ')
        {
            buffer.push(buf.slice(start,offset).join(''))
            start=++offset
        }
    }
    buffer.push(buf.slice(start,buf.length).join(''))
    return buffer
}

var str = 'drwxr-xr-x    3 acuteinfo  staff    102 Apr 27 18:24 dist'

str = removeDupli(str)

str = str.split('')

var out = colsSeperate(str)

console.log(out)