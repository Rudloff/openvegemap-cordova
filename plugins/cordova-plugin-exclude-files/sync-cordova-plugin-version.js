'use strict'

const fs = require('fs')
const xmlpoke = require('xmlpoke')
const version = require('./package.json').version

const PLUGIN_FILE = 'plugin.xml'

xmlpoke(PLUGIN_FILE, function (xml, project) {
  xml.addNamespace('ns', 'http://apache.org/cordova/ns/plugins/1.0')
     .set('ns:plugin/@version', version)
})

// Add trailing newline to plugin.xml
fs.appendFileSync(PLUGIN_FILE, '\n')
