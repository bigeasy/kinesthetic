var cadence = require('cadence')
var Integer = require('big-integer')
var partition = require('./partition')

var reparition = cadence(function (async, kinesis, name, count) {
    var loop = async(function () {
        async(function () {
            kinesis.describeStream({ StreamName: name }, async())
        }, function (response) {
            if (response.StreamDescription.StreamStatus == 'UPDATING') {
                async(function () {
                    console.log('updating')
                    setTimeout(async(), 1000)
                }, function () {
                    return [ loop.continue ]
                })
            }
        }, function (response) {
            return [ response, partition(count) ]
        }, function (response, partitions) {
                        console.log(response)
            var shards = response.StreamDescription.Shards.filter(function (shard) {
                return shard.SequenceNumberRange.EndingSequenceNumber == null
            }).sort(function (a, b) {
                return new Integer(a.HashKeyRange.StartingHashKey).compare(b.HashKeyRange.StartingHashKey)
            })
            var compare = 0
            console.log(partitions.map(function (partition) {
                return {
                        from: new Integer(partition.from).toString(),
                        to: new Integer(partition.to).toString()
                    }
            }))
            console.log(shards)
            while (compare == 0 && partitions.length) {
                var partition = partitions.shift()
                var shard = shards.shift()
                compare = new Integer(partition.to).compare(shard.HashKeyRange.EndingHashKey)
                if (compare > 0 || new Integer(partition.to).add(1).equals(shard.HashKeyRange.EndingHashKey)) {
                    async(function () {
                        kinesis.mergeShards({
                            StreamName: response.StreamDescription.StreamName,
                            ShardToMerge: shard.ShardId,
                            AdjacentShardToMerge: shards[0].ShardId
                        }, async())
                    }, function () {
                        return [ loop.continue ]
                    })
                } else if (compare < 0) {
                    async(function () {
                        kinesis.splitShard({
                            StreamName: response.StreamDescription.StreamName,
                            ShardToSplit: shard.ShardId,
                            NewStartingHashKey: new Integer(partition.to).add(1).toString()
                        }, async())
                    }, function (response) {
                        console.log(response)
                        return [ loop.continue ]
                    })
                } else if (partitions.length == 0) {
                    return [ loop.break ]
                }
            }
            console.log('leaving')
        })
    })()
})

module.exports = reparition
