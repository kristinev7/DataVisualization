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
            //console.log(res.data);
            //console.log(res.data[0].Distance);
            // console.log(Object.keys(res.data).length);
           drawTable(res.data)
        }

    });
}

function drawTable(csvData) {
    var d = csvData;
    var data = new google.visualization.DataTable();
    //var data = new google.visualization.DataTable();
    // data.addColumn('string', 'Ballpark');
    // data.addColumn('number', 'Distance');
    data.addColumn('number', 'Exit_Velocity');
    data.addColumn('number', 'Elevation_Angle');
    data.addColumn('number', 'Horizontal_Angle');
    $.each(d, function(i, d) {
        //var park = d.Ballpark;
        //console.log(park);
        //var distance = parseInt(d.Distance);
       // console.log(distance);
        var exit_vel = parseFloat(d.Exit_Velocity);
        console.log(exit_vel);
        var elev_ang = parseFloat(d.Elevation_Angle);
        //console.log(elev_ang);
        var hor_ang = parseFloat(d.Horizontal_Angle);
        //  console.log(hor_ang);
        // data.addRows([[park, distance, exit_vel, elev_ang, hor_ang]]);
        data.addRows([[exit_vel, elev_ang, hor_ang]]);
    })
    console.log(data);

     var newData = google.visualization.data.group(data, //[{
    //     column: 0,
    //     label: 'Ballpark',
    //     type: 'string'
    // }],
    // [{
    //     column: 0, 
    //     label: 'Avg Distance',
    //     aggregation: google.visualization.data.avg,
    //     type: 'number'
    // }], 
    [{
        column: 0,
        label: 'Avg Exit_Velocity',
        aggregation: google.visualization.data.avg,
        type: 'number'
    }],
    // [{
    //     column: 1,
    //     label: 'Avg Elevation_Angle',
    //     aggregation: google.visualization.data.avg,
    //     type:'number'
    // }], 
    [{
        column: 1,
        label: 'Avg Horizontal_Angle',
        aggregation: google.visualization.data.avg,
        type: 'number'
    }]);

    var options = {
        bars: 'horizontal', 
        hAxis: {format: 'decimal'},
        height: 800,
        colors: ['#1b9e77', '#d95f02', '#7570b3']
    };
    var table = new google.charts.Bar(document.getElementById('chart_div'));

    table.draw(newData, google.charts.Bar.convertOptions(options));
}