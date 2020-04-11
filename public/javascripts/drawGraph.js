async function getData() {
    let response = await fetch(`http://localhost:3000/greece-data`);
    let data = await response.json()
    return data;
}

getData()
    .then((data) => {
        $('table').after(`<h3>${JSON.stringify(data)}</h3>`)
        drawChart(data);
    });

function drawChart(data) {
    /*
    ta -data- einai ta data sou me format Attay of objects:
    [
        { date: '3/21/20', num: '530' },
        { date: '3/22/20', num: '624' },
        { date: '3/23/20', num: '695' },
        klp,
        klp,
        klp
    ]
    -v- 8ewritika apo dw kai pera paizeis mpala gia na ftiakseis to graph -v-
    P.S: sou exw ftiaksei kai ena element sto index.ejs to opoio einai starting point sou
    <div id="graph-container" class="container"></div>
    */
   console.log(data)
    let date = data.map(function(d){
        return d.date
        // .substring(0, d.date.length - 3);
    })
    console.log(date)
    let pNumber = data.map(function(d){
        return parseInt(d.num);
    })
    let num = [];
    num.push(pNumber)
   console.log(num)

   let graphData = {
    labels: date,
    series: num
   }
   let graphOptions = {
    fullWidth: true,
    chartPadding: {
      right: 40
    },
    axisX: {
        labelInterpolationFnc: function skipLabels(value, index, labels) {
          let labelScale = Math.round( ( labels.length + 60 ) / 30 );
          console.log(labelScale)
          if(labels.length > 10) {
            return index % 10  === 0 ? value : null;
          } else {
            return value;
          }
        }
      }
   }

  new Chartist.Line('#graph-container', graphData, graphOptions);
}