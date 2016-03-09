require('proof')(2, prove)

function prove (assert) {
    var encode = require('../../encode')
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'
    var complete = encode(new Buffer(alphabet), 1024)
    assert(complete, 'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoK', 'complete')
    var truncated = encode(new Buffer(alphabet), 25)
    assert(truncated, 'YWJjZGVmZ2hpamtsbW5vCg==', 'truncated')
}
