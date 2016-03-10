function Worker () {
}

Worker.prototype.data = function (message, socket) {
    this._gathering.push({ message: message, socket: socket })
}

// TODO Implement octet framing either here or up in Prolific. (Meh.)
Worker.prototype.gather = cadence(function (async, timeout, work) {
    async(function () {
        new Delta(async()).ee(work.socket).on('data', []).on('end')
    }, function (data) {
        var accumulator = this._buckets[work.bucket]
        if (!accumulator) {
            accumulator = this._buckets[work.bucket] = new Accumulator
        }
        var lines = Buffer.concat(data).toString('utf8').split(/\n/)
        if (lines[lines.length - 1] == '\n') {
            lines.pop()
        }
        this._stage.write(lines)
    })
})

Worker.prototype.send = cadence(function (async) {
    for (;;) {
        var records = this._stage.send()
        if (records.length == 0) {
            break
        }
        this._kinesis.putRecords({
        }, async())
    }
})
