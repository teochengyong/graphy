(function () {
  'use strict'
  const data = [4, 8, 15, 16, 23, 42]
  const root = this
  const previous = root.Viz

  let hasRequire = typeof require !== 'undefined'
  let d3 = root.d3

  if (typeof d3 === 'undefined') {
    if (hasRequire) {
      d3 = require('d3')
    } else throw new Error('Viz requires d3, see `"https://d3js.org/`"')
  }

  const Viz = function Viz () {}

  Viz.prototype.d3 = d3
  Viz.prototype.noConflict = function () {
    root.Viz = previous
    return Viz
  }

  Viz.prototype.draw = function (type, options) {

  }

  Viz.prototype.transform = function (data, options) {

  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = Viz
    }
    exports.Viz = Viz
  } else {
    root.Viz = Viz
  }
}).call(this)
