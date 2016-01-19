Initial version will compromise in these ways.

Intake is a single server listening on an end point. It stamps packets and
breaks them up for submission into the Kinesis stream.

There is not going to be no single producer that can overwhelm a single
listener. If you do create such a beast, you'll need to find a way to scale at
the producer level, you'll need to break it up in some way. Otherwise you'd
create multiple Kinesis streams or multiple Kinesthetic listeners.

The streams API is not the write API for Kinesis. That is too much of an
abstraction. You should write a listener that accepts records in batches,
processes them in batches, and the best way to implement this would be to
implement an HTTP end point that listens for events.

Now it seems that we're feeding a Kinesis stream streaming data and we can scale
by creating multiple Kinesis streams or else by adding more listeners to an
existing stream.

Consumption is going to filter the stream, providing an initial line filter. The
line filter could be JavaScript that operates on each line that is loaded into
the listener, which would save a copy of the data, but that means loading the
code, so we might have workers that spawn and load modules, process, then shut
down when they are done.

The filter would be pulling from our partitions which are simply buckets. Each
bucket has a chunk. We can take our buckets and put them time stamped directly
into S3. We can filter them and put the filtered buckets into S3.

We can also write them to an in-memory or file index. An in-memory index would
assemble the filtered buffers and then push them to the HTTP end point of a
consumer.

This is a problem of scaling the processing. We can put everything somewhere in
parallel without inspecting it. We can filter it so that a single processor can
make sense of the contiguous stream. We can split a stream by another method and
distribute the shards to producers.
