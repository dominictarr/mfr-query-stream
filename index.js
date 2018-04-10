var nested = require('libnested')
var pull = require('pull-stream')
var More = require('pull-more')
var HyperMoreStream = require('hyperloadmore/stream')

module.exports =  function stream (read, query, createTransform, content) {

  function createStream (opts) {
    var path = ['query', 0, '$filter', 'timestamp', opts.reverse ?  '$lt' : '$gt']
    nested.set(opts, path, Date.now())
    return pull(
      More(read, opts, 'timestamp', path),
      createTransform()
    )
  }

  pull(
    createStream({
      query: nested.clone(query), limit: 10,
      old: false, private: true
    }),
    HyperMoreStream.top(content)
  )

  pull(
    createStream({
      query: nested.clone(query), limit: 10,
      live: false, private: true, reverse: true
    }),
    HyperMoreStream.bottom(content)
  )

  return content
}

