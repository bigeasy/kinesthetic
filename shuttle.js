function Shuttle () {
}

Shuttle.prototype.socket = function (socket) {
    var bucket = this.bucket++
    if (this.bucket == 1024) {
        this.bucket = 0
    }
    var worker = bucket % this.workers.length
    this.worker.send({ bucket: bucket }, socket, async())
}

module.exports = cadence(function (async, port, host) {
    var server = net.createServer(function (socket) {
        socket.on('data', function (chunk) {
            program.stdout.write(chunk.toString())
        })
    })
    server.listen(port, host, async())
})
