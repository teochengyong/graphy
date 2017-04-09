(function (w) {
  const inputSelector = 'input'
  const inputEl = document.getElementById(inputSelector)

  let postCodes
  inputEl.addEventListener('change', (e) => {
    const fr = new window.FileReader()
    let data
    fr.onloadend = (e) => {
      const text = fr.result
      data = text.split('\n')
      data = data.filter((d) => d.length === 6)
      console.log(data)
      postCodes = data && data.length > 0 ? data : []
      if (postCodes) {
        document.querySelector('.total').textContent = postCodes.length + ' postcodes loaded.'
        fetchDistanceMatrix(postCodes)
      } else {
        document.querySelector('.total').textContent = 'No valid  postcodes'
      }
    }

    if (e.target.files.length > 0) {
      fr.readAsText(e.target.files[0], 'UTF-8')
    }
  }, false)

  var fetchDistanceMatrix = (data) => {
    const googleAPIOrigin = 'https://maps.googleapis.com/maps/api/'
    const distanceMatrixAPI = 'distancematrix'
    const dataFormat = 'json'
    const apiKey = ''
    const url = googleAPIOrigin + distanceMatrixAPI + '/' + dataFormat

    const origin = '486046' // SIA sports club postcodes
    let destinationData = data.slice(0, 100).join('|')
    let queryObject = {
      key: apiKey,
      origins: origin,
      destinations: destinationData
    }
    const onError = function (jqXHR, textStatus, errorThrown) {
      var test = window.$.parseJSON(jqXHR.responseText)
      var test2 = window.$.parseJSON(test.d)
      window.alert(test2[0].Name)
    }

    window.$.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      data: queryObject,
      processData: true
    }).done(function (response) {
      renderChart(response.rows[0].elements)
      console.log(response)
    }).fail(onError)
  }
  const renderChart = function (elements) {
    const height = 500
    const width = 1080
    let y = window.d3.scaleLinear()
            .range([height, 0])

    let chart = window.d3.select('.chart')
          .attr('width', width)
          .attr('height', height)
    let data = elements
      .map(element => {
        if (element.status === 'OK') {
          if (Number.isInteger(element.distance.value)) {
            return element.distance.value
          }
        }
      })
      .filter(distance => Number.isInteger(distance) && distance < 100000) // Removing any place more than 100km temporarily due to dirty data
    const drawChart = function (data) {
      console.log(data)
      y.domain([0, window.d3.max(data, function (d) {
        return +d
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
            return y(+d)
          })
          .attr('height', function (d) { return height - y(+d) }) // origin of y is on the top left
          .attr('width', barWidth - 1)

      bar.append('text')
        .attr('y', function (d) {
          return y(+d) + 3
        })
        .attr('x', barWidth / 2)
        .attr('dy', '.75em')
        .text(function (d) {
          return parseInt(d / 1000, 10)
        })
    }
    drawChart(data)
  }
})(window)
