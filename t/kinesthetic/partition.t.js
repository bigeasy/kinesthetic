require('proof')(1, prove)

function prove (assert) {
    var partition = require('../../partition')
    assert(partition(6).map(function (partition) {
        return {
            from: partition.from.toString(16),
            to: partition.to.toString(16)
        }
    }), [
        { from: '0',
            to: '2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa9' },
        { from: '2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            to: '55555555555555555555555555555553' },
        { from: '55555555555555555555555555555554',
            to: '7ffffffffffffffffffffffffffffffd' },
        { from: '7ffffffffffffffffffffffffffffffe',
            to: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa7' },
        { from: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8',
            to: 'd5555555555555555555555555555551' },
        { from: 'd5555555555555555555555555555552',
            to: 'ffffffffffffffffffffffffffffffff' }
    ], 'partition')
}
