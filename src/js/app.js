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
  d3.select('.chart')
        .selectAll('div')
        .data(barData)
        .enter().append('div')
        .style('width', function (d) { return d * 10 + 'px' })
        .text(function (d) { return d })
})(window)
