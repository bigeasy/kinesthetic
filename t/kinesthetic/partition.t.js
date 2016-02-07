require('proof')(1, prove)

function prove (assert) {
    var partition = require('../../partition')
    assert(partition(6).map(function (partition) {
        return {
            from: partition.from.toString(16),
            to: partition.to.toString(16)
        }
    }), [
        { from: '0', to: '2aaaaaaaaaaaaaaaaaaaaaaaaaaaaa9f' },
        { from: '2aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0',
          to: '5555555555555555555555555555553f' },
        { from: '55555555555555555555555555555540',
          to: '7fffffffffffffffffffffffffffffdf' },
        { from: '7fffffffffffffffffffffffffffffe0',
          to: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa7f' },
        { from: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa80',
          to: 'd555555555555555555555555555551f' },
        { from: 'd5555555555555555555555555555520',
          to: 'ffffffffffffffffffffffffffffffff' }
    ], 'partition')
}
