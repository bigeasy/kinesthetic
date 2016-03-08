function Worker (kinesis) {
    if (options.separator) {
        this._separator = options.separator.slice().reverse()
    }
}

Worker.prototype.register = cadence(function (async, shard) {
})

Worker.prototype.unregister = cadence(function (async, shard) {
})

Worker.prototype.chunk = cadence(function (chunk) {
})
