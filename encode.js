module.exports = function (line, limit) {
    var base64 = new Buffer(line + '\n').toString('base64')
    if (base64.length >= limit) {
        limit = limit & ~3
        base64 = base64.substring(0, (limit & ~3) - 4) + 'Cg=='
    }
    return base64
}
