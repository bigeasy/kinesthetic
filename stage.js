function Stage (instance, buckets, limit) {
    this._instance = instance
    this._buckets = {}
    this._limit = limit
    this._counts = {}
    for (var i = 0; i < 1024; i++) {
        this._counts[i] = 0
    }
}

Stage.prototype.write = function (bucket, lines) {
    var accumulator = this._buckets[bucket]
    if (!accumulator) {
        accumulator = this._buckets[bucket] =
            new Accumulator(this._instance, this._counts[bucket], this._limit)
    }
    lines.forEach(accumulator.write.bind(accumulator))
}

Stage.prototype.send = function () {
    var requestLength = 1024 * 4.75, records = []
    for (;;) {
        var buckets = Object.keys(this._buckets)
        if (buckets.length == 0) {
            break
        }
        buckets.forEach(function (bucket) {
            var accumulator = this._buckets[bucket]
            accumulator.end()
            var length = accumulator.records[0].length + String(bucket).length
            if (requestLength - length >= 0) {
                var data = accumulator.records[0].shift
                records.push({ PartitionKey: partitionKey, Data: data })
            }
            if (accumulator.records.length == 0) {
                this._counts[bucket] = accumulator.count
                delete this._buckets[bucket]
            }
        }, this)
    }
}
