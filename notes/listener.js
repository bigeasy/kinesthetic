function Listener () {
    this._parition = 0
}

Listener.prototype.recieve = function (buffer) {
    var parition = this._partition++
}
