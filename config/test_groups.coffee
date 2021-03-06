fs = require 'fs'
path = require 'path'
_ = require 'underscore'
gutil = require 'gulp-util'
FILES = require './files'

resolveModule = (module_name) -> path.relative('.', require.resolve(module_name))

module.exports = TEST_GROUPS = {}

###############################
# Browser Globals
###############################
LIBRARIES =
  backbone_underscore: (resolveModule(module_name) for module_name in ['jquery', 'underscore', 'backbone', 'backbone-orm']).concat(['./backbone-http.js'])
  backbone_underscore_min: (resolveModule(module_name) for module_name in ['jquery', 'underscore', 'backbone', 'backbone-orm']).concat(['./backbone-http.min.js'])
  backbone_lodash: (resolveModule(module_name) for module_name in ['jquery', 'lodash', 'backbone', 'backbone-orm']).concat(['./node_modules/backbone-orm/stream.js', './backbone-http.js'])
  backbone_lodash_min: (resolveModule(module_name) for module_name in ['jquery', 'lodash', 'backbone', 'backbone-orm']).concat(['./node_modules/backbone-orm/stream.js', './backbone-http.min.js'])

TEST_GROUPS.browser_globals = []
for library_name, library_files of LIBRARIES
  TEST_GROUPS.browser_globals.push({name: "browser_globals_#{library_name}", files: library_files.concat(['./_temp/parameters.js', './node_modules/backbone-orm/test/spec/sync/**/*.tests.coffee'])})

###############################
# AMD
###############################
AMD_OPTIONS = require './amd/gulp-options'
AMD_OPTIONS_NO_STREAM = require './amd/gulp-options-no-stream'

TEST_GROUPS.amd = []
for test in TEST_GROUPS.browser_globals when (test.name.indexOf('_min') < 0 and test.name.indexOf('legacy_') < 0 and test.name.indexOf('parse_') < 0)
  test_files = ['./node_modules/chai/chai.js'].concat(test.files); files = []; test_patterns = []; path_files = []
  files.push({pattern: './test/lib/requirejs-2.1.14.js'})
  for file in test_files
    (test_patterns.push(file); continue) if file.indexOf('.tests.') >= 0
    files.push({pattern: file, included: false})
    path_files.push(file)
  files.push("_temp/amd/#{test.name}/**/*.js")
  TEST_GROUPS.amd.push({name: "amd_#{test.name}", files: files, build: {files: test_patterns, destination: "_temp/amd/#{test.name}", options: _.extend({path_files: path_files}, if './node_modules/backbone-orm/stream.js' in test_files then AMD_OPTIONS else AMD_OPTIONS_NO_STREAM)}})

###############################
# Webpack
###############################
TEST_GROUPS.webpack = []
for file in FILES.tests_webpack
  test_file = path.basename(file, '.js').replace('.webpack.config', '')
  TEST_GROUPS.webpack.push({name: "webpack_#{test_file.replace('tests.coffee', '')}", files: [path.join('_temp/webpack', test_file).replace('.coffee', '.js')]})

###############################
# Browserify
###############################
TEST_GROUPS.browserify = []
for test_name, test_info of require './browserify/tests'
  TEST_GROUPS.browserify.push({name: "browserify_#{test_name}", files: [test_info.output], build: {destination: test_info.output, options: test_info.options, files: test_info.files}})
