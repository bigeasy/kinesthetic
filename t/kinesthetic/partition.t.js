require('proof')(1, prove)

function prove (assert) {
    var partition = require('../../partition')
    assert(partition(6).map(function (partition) {
        return partition.toString(16)
    }), [
        '2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        '55555555555555555555555555555554',
        '7ffffffffffffffffffffffffffffffe',
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa8',
        'd5555555555555555555555555555552'
    ], 'partition')
}
