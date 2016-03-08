var cadence = require('cadence')

function Kinesthetic (AWS) {
    this._AWS = aws
    this._head = {}
    this._head.previous = this._head.next = this._head
}

Kinesthetic.prototype.publish = function (buffer) {
    var entry = {
        buffer: buffer,
        next: this._head.next,
        previous: this._head
    }
    entry.next.previous = entry
    entry.previous.next = entry

}

Kinesthetic.prototype._publish = cadence(function (async, timeout) {
    var head = this._head
})
