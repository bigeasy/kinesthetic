function Worker () {
}

Worker.prototype.data = function (message, socket) {
    this._gathering.push({ message: message, socket: socket })
}

// TODO Implement octet framing either here or up in Prolific.
Worker.prototype.gather = cadence(function (async, timeout, work) {
    async(function () {
        new Delta(async()).ee(work.socket).on('data', []).on('end')
    }, function (data) {
        var log = this._buckets[work.bucket]
        if (!log) {
            log = this._buckets[work.bucket] = []
        }
        // TODO Split if data is bigger than 1MB.
        var lines = Buffer.concat(data).toString('utf8').split(/\n/)
        if (lines[lines.length - 1] == '\n') {
            lines.pop()
        }
        var buffers = lines.forEach(function (line) {
            var buffer = new Buffer(line + '\n')
        })
    })
})

Worker.prototype.send = cadence(function (async) {
    var buckets = Object.keys(this._buckets)
    if (buckets.length == 0) {
        return
    }
    buckets.forEach(function (bucket) {
        var logs = this._bucket[key]
    }, this)
})
