const test = require('ava')
const Viz = require('../src/js/modules/viz.js')
const D3 = require('d3')
const fixtures = [
    {
        'label': 'D3 should be present',
        'input': '',
        'expected': D3
    }
]

for( const {label, input, expected} of fixtures) {
    test(label, (t) => {
        const viz = new Viz()
        const actual = viz.d3
        t.is(actual, expected)
    })
}
