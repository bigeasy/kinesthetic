require('proof')(6, prove)

function prove (assert) {
    var Accumulator = require('../../accumulator')
    var accumulator = new Accumulator(1, 0, 0, 256)
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'

    var x = new Array(accumulator.byteLimit + 1).join('x')

    accumulator.end()

    accumulator.write(alphabet)
    accumulator.write(alphabet.split('').reverse().join(''))
    accumulator.end()

    var record = accumulator.records.shift()

    var lines = new Buffer(record, 'base64').toString().split('\n')
    assert(JSON.parse(lines[0]), { instance: 1, bucket: 0, count: 0 }, 'header')
    assert(lines[1], alphabet, 'first line')
    assert(lines[2], alphabet.split('').reverse().join(''), 'second line')

    for (var i = 0; i < 12; i++) {
        accumulator.write(alphabet)
    }

    accumulator.write(new Array(13).join(alphabet))

    accumulator.end()

    record = accumulator.records.shift()

    lines = new Buffer(record, 'base64').toString().split('\n')
    assert(JSON.parse(lines[0]), { instance: 1, bucket: 0, count: 1 }, 'increment')

    record = accumulator.records.pop()
    lines = new Buffer(record, 'base64').toString().split('\n')

    assert(record.length, 256, 'truncated')

    assert(accumulator.count, 4, 'count')
}
