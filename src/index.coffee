###
  backbone-http.js 0.5.0
  Copyright (c) 2013 Vidigami - https://github.com/vidigami/backbone-http
  License: MIT (http://www.opensource.org/licenses/mit-license.php)
  Dependencies: Backbone.js and Underscore.js.
###

# ensure the client symbols are resolved
if window?
  require.shim([
    {symbol: '_', path: 'lodash', alias: 'underscore', optional: true}, {symbol: '_', path: 'underscore'}
    {symbol: 'Backbone', path: 'backbone'}
    {symbol: 'superagent', path: 'superagent'}
    {symbol: 'Backbone.ORM', symbol_path: 'backbone.ORM', path: 'backbone-orm'}
  ])

module.exports =
  sync: require './sync'
