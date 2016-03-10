var newLineIndex = require('./nl')

function Accumulator (instance, bucket, count, limit) {
    this.instance = instance
    this.bucket = bucket
    this.count = count
    this.limit = limit
    this.byteLimit = (limit & ~3) / 4 * 3
    this.records = []
    this._lines = []
    this._length = 0
}

Accumulator.prototype.write = function (line) {
    if (this._lines.length == 0) {
        var header = JSON.stringify({
            instance: this.instance,
            bucket: this.bucket,
            count: this.count++
        })
        this._lines.push(header)
        this._length = Buffer.byteLength(header) + 1
    }
    var length = Buffer.byteLength(line) + 1
    if (this._length + length <= this.limit) {
        this._lines.push(line)
        this._length += length
    } else if (this._lines.length == 1) {
        var newLineAt = this.byteLimit - this._length - 1
        var buffer = new Buffer(line)
        this._lines.push(buffer.slice(0, newLineIndex(buffer, newLineAt)).toString())
        this.end()
    } else {
        this.end()
        this.write(line)
    }
}

Accumulator.prototype.end = function () {
    if (this._lines.length != 0) {
        this._length = 0
        var lines = this._lines
        this._lines = []
        lines.push('')
        this.records.push(new Buffer(lines.join('\n')).toString('base64'))
    }
}

module.exports = Accumulator
