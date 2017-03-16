(function () {
  "use strict";
  const data = [4, 8, 15, 16, 23, 42]
  const root = this
  const previous = root.Viz

  let has_require = typeof require !== 'undefined'
  let d3 = root.d3

  if(typeof d3 === 'undefined') {
    if(has_require) {
      d3 = require('d3')
    } else throw new Error('Viz requires d3, see `"https://d3js.org/`"')
  }


  const Viz = function Viz() {}

  Viz.prototype.d3 = d3
  Viz.prototype.noConflict = function () {
    root.Viz = previous
    return Viz
  }

  Viz.prototype.draw = function (type, options) {
    return
  }

  Viz.prototype.transform = function (data, options) {
    return
  }




  if(typeof exports !== 'undefined') {
    if( typeof module !== 'undefined' && module.exports) {
      module.exports = Viz
    }
    exports.Viz = Viz
  } else {
    root.Viz = Viz
  }
}).call(this)
