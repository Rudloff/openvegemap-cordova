'use strict'

module.exports = function (context) {
  const Q = context.requireCordovaModule('q')
  const exec = Q.denodeify(require('child_process').exec)

  console.log('Installing dependencies for plugin', context.opts.plugin.id)
  return exec('npm install', {cwd: context.opts.plugin.dir})
}
