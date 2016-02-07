var Integer = require('big-integer')

function partition (shards) {
    var n = new Integer('ffffffffffffffffffffffffffffffff', 16)
    var size = n.divide(shards)
    var partition = new Integer(0)
    var partitions = [{ from: 0, to: partition.add(size).subtract(1) }]
    for (var i = 1; i < shards; i++) {
        partition = partition.add(size)
        partitions.push({ from: partition.add(0), to: partition.add(size).subtract(1) })
    }
    partitions[partitions.length - 1].to = n
    return partitions
}

module.exports = partition
