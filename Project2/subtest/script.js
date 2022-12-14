function data1() {
    $.ajax({
        url: 'getData1.php',
        type: 'POST',
        dataType: 'json',
        success: function(response)
        {
            console.log("data1: ", response);
            //response = JSON.stringify(response);
            console.log(response);
            drawTable(response);
            // var msg = response;
            // $("#msgForUser").css("display", "block");
            // $("#messageArea").text(msg);
            // $("#displayGraph").text(msg);
            // $("#chart").text(msg);
        },
        error : function (xmlHttpRequest, textStatus, errorThrown) 
        {
            console.log(textStatus);
            console.log("Error " + errorThrown);
        } 
    })
}

function drawTable(d) {
    var d = d;
    var dataVis = new google.visualization.DataTable(d);
    dataVis.addColumn('number', 'RecordNumber');
    dataVis.addColumn('number', 'Zipcode');
    dataVis.addColumn('string', 'City');
    dataVis.addColumn('string', 'State');
    dataVis.addColumn('number', 'EstimatedPopulation');
    dataVis.addColumn('number', 'TotalWages');
    dataVis.addColumn('number', 'AvgWages');
    $.each(d, function(i, d) {
        var rn = parseInt(d.RecordNumber);
        //console.log(rn);
        var z = parseInt(d.Zipcode);
        //console.log(z);
        var c = d.City;
        //console.log(c);
        var s = d.State;
        //console.log(s);
        var ep = parseInt(d.EstimatedPopulation);
        //console.log(ep);
        var tw = parseFloat(d.TotalWages);
        //console.log(tw);
        var aw = parseFloat(d.AvgWages);
        //console.log(aw);
        dataVis.addRows([[rn, z, c, s, ep, tw, aw]])
    });

    console.log("dataVis: ", dataVis);
    var range = dataVis.getColumnRange(6);
    var max = range.max;
    console.log(range.max);
    console.log(range.min);
    var avg_value=0;
    // console.log(keys);
    var rowInds = dataVis.getSortedRows([{column: 6}]);
        for (var i = 0; i < rowInds.length; i++) {
            var v = dataVis.getValue(rowInds[i], 6);  
        }
        avg_value = max/rowInds.length;
        console.log(avg_value);
        const keys = dataVis.getFilteredRows([{column: 6, minValue: avg_value, maxValue: max}]);
        console.log(keys);
        //.setProperty('background-color', 'red');
        // if (v > range.max) {
        //     console.log("v ", v);
        //     dataVis.setRowProperty(i, 6, 'background-color', 'red')
        // }
    // console.log(dataVis.getColumnRange(6));
  
    var options = {
        width: '500px',
        height: '500px'
    };
    var table = new google.visualization.Table(document.getElementById('graphArea'));

    table.draw(dataVis, options);
}