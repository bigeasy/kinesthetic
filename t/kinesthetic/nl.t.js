require('proof')(1, prove)

function prove (assert) {
    var newLineIndex = require('../../nl')
    var buffer = new Buffer('한국어')
    assert(newLineIndex(buffer, buffer.length - 1), 6, 'multi-byte')
}
