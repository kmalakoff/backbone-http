util = require 'util'
_ = require 'underscore'

Cursor = require 'backbone-orm/lib/cursor'
JSONUtils = require 'backbone-orm/lib/json_utils'

module.exports = class AjaxCursor extends Cursor

  ##############################################
  # Execution of the Query
  ##############################################
  toJSON: (callback) ->
    # build query
    query = JSONUtils.toQuery(_.extend(_.extend({}, @_find), @_cursor))
    @request
      .get(@url)
      .query(query)
      .type('json')
      .end (err, res) =>
        return callback(err) if err
        return callback(null, null) if query.$one and (res.status is 404) # not found
        return callback(new Error "Ajax failed with status #{res.status} with: #{util.inspect(res.body)}") unless res.ok
        result = JSONUtils.parse(res.body)
        callback(null, if (@hasCursorQuery('$count') or @hasCursorQuery('$exists')) then result.result else result)
