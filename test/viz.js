const test = require('ava')
const Viz = require('../src/js/modules/viz.js')
const D3 = require('d3')
const fixtures = [
    {
        'label': 'D3 should be present',
        'input': '',
        'expected': D3
    },
    {
        'label': 'Expect draw function to be present',
        'input': 'draw',
        'expected': true
    },
    {
        'label': 'Expect to draw a bar chart',
        'input': ['bar', {}],
        'expected': true
    },
    {
        'label': 'Expect to draw a line chart',
        'input': ['line', {}],
        'expected': true
    },
    {
        'label': 'Expect to draw a pie chart',
        'input': ['pie', {}],
        'expected': true
    }
]

for( const {label, input, expected} of fixtures) {
    test(label, (t) => {
        const viz = new Viz()
        const actual = viz.d3
        t.is(actual, expected)
    })
}
