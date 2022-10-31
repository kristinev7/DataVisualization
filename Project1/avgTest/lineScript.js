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

// function drawTable(csvData) {
//     var data = new google.visualization.arrayToDataTable(csvData);
//     console.log(data);
//     var options = {
//         width: '1000px',
//     };
//     var table = new google.visualization.Table(document.getElementById('chart_div'));
//     table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
// }

function drawTable(csvData) {
    var d = csvData;
    //var d = new google.visualization.arrayToDataTable(csvData);
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

    var newData = google.visualization.data.group(data, [{
        column: 0,
        label: 'Ballpark',
        type:'string'  
    }], [{
        column: 1,
        label: 'Avg Distance',
        aggregation: google.visualization.data.avg,
        type: 'number'
    }]);
    var options = {
        width: 1000,
        height: 500,
        axes: {
            x: {
                0: {side: 'top'}
            }
        }
    };
    // var table = new google.visualization.LineChart(document.getElementById('chart_div'));
    var table = new google.charts.Line(document.getElementById('chart_div'));
    table.draw(newData, google.charts.Line.convertOptions(options));
}

// {showRowNumber: true, width: '100%', height: '100%'}