# mfr-query-stream

create a scroller for map-filter-reduce query.

Assumes that there is a timestamp property which the query is sorted by.

## example

``` js
var QueryStream = require('mfr-query-stream')
var pull = require('pull-stream')

return QueryStream(

  api.sbot.query.read, //function to query the database

  [{$filter: {value: { //the query. here we filter for messages with type: post that are not private.
    private: {$is: 'undefined'},
    content: {type: 'post'},
    author: id //by a given author.
  }}}],

  //a pull stream that takes messages and outputs html elements.
  pull.map(api.message.layout),

  //a container element to put all the items into.
  h('div.content')
)
```

## License

MIT
