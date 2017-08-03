'use strict'

const Q = require('q')
const del = require('del')
const _ = require('lodash')
const readFile = Q.denodeify(require('fs').readFile)
const parseXml = Q.denodeify(require('xml2js').parseString)

module.exports = function (context) {
  process.chdir(context.opts.projectRoot)
  return readFile('config.xml', 'utf8')
    .then(parseXml)
    .then(config => new ProjectInformation(config, context))
    .then(processPlatforms)
}

function processPlatforms (projectInformation) {
  return Q.all(projectInformation.getPlatforms().map(processPlatform))
}

function processPlatform (platform) {
  return del(platform.patterns, {cwd: platform.path})
    .then(_.partial(logExcludedPaths, platform))
}

function logExcludedPaths (platform, paths) {
  if (!paths.length) return
  const msg = `Excluded following paths from ${platform.name} build:\n  `
  console.log(msg + paths.join('\n  '))
}

class ProjectInformation {
  constructor (config, context) {
    this.widget = _.get(config, 'widget')
    this.paths = context.opts.paths
    this.platforms = context.opts.platforms
  }

  getPlatformConfigs () {
    const configs = _.keyBy(_.get(this.widget, 'platform'), '$.name')
    return this.platforms.map(_.propertyOf(configs))
  }

  getExcludePatterns () {
    const globalExcludes = getExcludePatternsFromElement(this.widget)
    return this.getPlatformConfigs()
      .map(getExcludePatternsFromElement)
      .map(excludes => globalExcludes.concat(excludes))

    function getExcludePatternsFromElement (elem) {
      return _.chain(elem).get('exclude-files').map('$.pattern').value()
    }
  }

  getPlatforms () {
    return _.zip(this.platforms, this.paths, this.getExcludePatterns())
      .map(vals => _.zipObject(['name', 'path', 'patterns'], vals))
  }
}
