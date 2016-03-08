// Listeners can be balanced using Round Robin DNS or else explicitly. Every
// listener should be assigned a unique 32-bit identifier, or else we can simply
// generate a 64-bit unique value pulling bits from random. Everything that gets
// queued gets stamped. Thus, no balancing of a single end point. Create a new
// end point. There is going to be no single producer that can overwhelm a
// single listener, if tehre is then you'll need to find a new way to scale at
// the producer level.
