$(document).ready(function () {
    document.getElementById('upload').addEventListener('click', () => {
        parseData();
    })
})

function parseData() {
    Papa.parse(document.getElementById('csvFile').files[0],
    {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(res) {
            console.log(res.data);
            //console.log(res.data[0].Distance);
            // console.log(Object.keys(res.data).length);
           drawTable(res.data)
        }

    });
}

function drawTable(csvData) {
    var d = csvData;
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Ballpark');
    data.addColumn('number',  'Distance');
    $.each(d, function(i, d) {
        var park = d.Ballpark;
        console.log(park);
        var distance = parseInt(d.Distance);
        console.log(distance);
        data.addRows([[park, distance]]);
    });

    var newData = google.visualization.data.group (data, [{
        column: 0,
        label: 'Ballpark',
        type: 'string'
    }],
     [{
        column: 1, 
        label: 'Avg Distance',
        aggregation: google.visualization.data.avg,
        type: 'number'
    }]
    );
    var options = {
        bars: 'horizontal',
        height: 500,
        width: 1000
    };

    var table = new google.charts.Bar(document.getElementById('chart_div'));
    table.draw(newData, options);
}
