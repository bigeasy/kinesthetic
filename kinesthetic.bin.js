/*

    ___ create, usage ___ en_US ___
    node kinesthetic.bin.js create <name>

    options:

        --help                          display help message
        --region           <string>     AWS region

    ___ $ ___ en_US ___

        name is required:
            a stream name is required.

    ___ delete, usage ___ en_US ___
    node kinesthetic.bin.js create <name>

    options:

        --help                          display help message
        --region           <string>     AWS region

    ___ $ ___ en_US ___

        name is required:
            a stream name is required.

    ___ describe, usage ___ en_US ___
    node kinesthetic.bin.js describe <name>

    options:

        --help                          display help message
        --region           <string>     AWS region

    ___ $ ___ en_US ___

        name is required:
            a stream name is required.

    ___ . ___

 */
require('arguable')(module, require('cadence')(function (async, program) {
    program.required('region')

    var AWS = require('aws-sdk')
    console.log(program.param.region)
    var kinesis = new AWS.Kinesis({ region: program.param.region })

    switch (program.command[0]) {
    case 'create':
        program.assert(program.argv.length == 1, 'name is required')
        kinesis.createStream({ ShardCount: 1, StreamName: program.argv[0] }, async())
        break
    case 'describe':
        program.assert(program.argv.length == 1, 'name is required')
        async(function () {
            kinesis.describeStream({ StreamName: program.argv[0] }, async())
        }, function (response) {
            console.log(response)
        })
        break
    case 'delete':
        program.assert(program.argv.length == 1, 'name is required')
        async(function () {
            kinesis.deleteStream({ StreamName: program.argv[0] }, async())
        }, function (response) {
            console.log(response)
        })
        break
    }
}))
