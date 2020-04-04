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
   

}