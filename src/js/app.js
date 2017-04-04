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
  const barData = [4, 8, 15, 16, 23, 42]
  const width = 420
  const barHeight = 20
  let x = window.d3.scaleLinear()
          .range([0, width])

  let chart = window.d3.select('.chart')
        .attr('width', width)

  window.d3.tsv('data/postcodes.data', type, function (error, data) {
    if (!error) {
      x.domain([0, window.d3.max(data, function (d) {
        return +d.postcode
      })])
      chart.attr('height', barHeight * data.length)
      let bar = chart
            .selectAll('g')
            .data(data)
            .enter().append('g')
            .attr('transform', function (d, i) {
              return `translate(0,` + i * barHeight + `)`
            })
      bar.append('rect')
          .attr('width', function (d) {
            return x(+d.postcode)
          })
          .attr('height', barHeight - 1)

      bar.append('text')
          .attr('x', function (d) {
            return x(+d.postcode) - 3
          })
          .attr('y', barHeight / 2)
          .attr('dy', '.35em')
          .text(function (d) {
            return d.postcode
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
