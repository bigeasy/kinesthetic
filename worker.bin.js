/*
    ___ usage ___ en_US ___
    node worker.bin.js

    options:

        --help                      display help message
        -b, --bind      <integer>   port to listen to
    ___ . ___

 */
require('arguable')(module, require('cadence')(function (async, program) {
    program.on('message', worker.data.bind(worker))
}))
