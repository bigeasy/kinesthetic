var Integer = require('big-integer')

function partition (shards) {
    var n = new Integer('ffffffffffffffffffffffffffffffff', 16)
    var size = n.divide(shards)
    var partition = new Integer(0)
    var partitions = []
    for (var i = 1; i < shards; i++) {
        partition = partition.add(size)
        partitions.push(partition.add(0))
    }
    return partitions
}

module.exports = partition
