const test = require('ava')
const Viz = require('../src/js/modules/viz.js')
const D3 = require('d3')
const fixtures = [
  {
    'label': 'Expect a tranform to bar height',
    'input': [[1, 2, 3, 4, 5], { 'type': 'bar' }],
    'expected': [1, 2, 3, 4, 5]
  },

  {
    'label': 'Expect a transform to radial coordinates',
    'input': [[1, 2, 3, 4, 5], { 'type': 'radial' }],
    'expected': [1, 2, 3, 4, 5]
  }
]

test('D3 should be present', (t) => {
  const viz = new Viz()
  const actual = viz.d3
  t.is(actual, D3)
})

test('Expect draw function to be present', (t) => {
  const viz = new Viz()
  if (typeof viz.draw === 'function') t.pass()
  else t.fail()
})

test('Expect transform function to be present', (t) => {
  const viz = new Viz()
  if (typeof viz.transform === 'function') t.pass()
  else t.fail()
})

for (const { label, input, expected } of fixtures) {
  test(label, (t) => {
    const viz = new Viz()
    const actual = viz(input)
    t.is(actual, expected)
  })
}

