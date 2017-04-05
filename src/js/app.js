(function (w) {
  const inputSelector = 'input'
  const inputEl = document.getElementById(inputSelector)
  const airportPostcode = 819634
  inputEl.addEventListener('change', (e) => {
    const fr = new window.FileReader()
    let data
    fr.onloadend = (e) => {
      const text = fr.result
      data = text.split('\n')
      data = data.filter((d) => d.length === 6)
      console.log(data)
    }

    if (e.target.files.length > 0) {
      fr.readAsText(e.target.files[0], 'UTF-8')
    }
  }, false)
  const height = 500
  const width = 1080
  let y = window.d3.scaleLinear()
          .range([height, 0])

  let chart = window.d3.select('.chart')
        .attr('width', width)
        .attr('height', height)

  window.d3.tsv('data/data.tsv', type, function (error, data) {
    if (!error) {
      y.domain([0, window.d3.max(data, function (d) {
        return +d.value
      })])
      let barWidth = width / data.length
      let bar = chart
            .selectAll('g')
            .data(data)
            .enter().append('g')
            .attr('transform', function (d, i) {
              return `translate(` + i * barWidth + `, 0)`
            })
      bar.append('rect')
          .attr('y', function (d) {
            return y(+d.value)
          })
          .attr('height', function (d) { return height - y(+d.value) }) // origin of y is on the top left
          .attr('width', barWidth - 1)

      bar.append('text')
          .attr('y', function (d) {
            return y(+d.value) + 3
          })
          .attr('x', barWidth / 2)
          .attr('dy', '.75em')
          .text(function (d) {
            return d.value
          })
    } else {
      throw error
    }
  })

  function type (d) {
    d.value = +d.value // coerce to number
    return d
  }
})(window)
