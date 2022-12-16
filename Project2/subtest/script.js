var avgValue;
var estValue;

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
        },
        error : function (xmlHttpRequest, textStatus, errorThrown) 
        {
            console.log(textStatus);
            console.log("Error " + errorThrown);
        } 
    })
}
//draws table
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
    //wage range
    var wage_range = dataVis.getColumnRange(5);
    var max = wage_range.max;
    var min = wage_range.min
    console.log("max wage: ", wage_range.max);
    console.log("min wage: ", wage_range.min);

    var wage_min = document.getElementById("wage_range");
    var wage_max = document.getElementById("wage_range");
    var pop_max = document.getElementById("estPop_range");
    var pop_min= document.getElementById("estPop_range");
    var wage_value = document.getElementById("w");
    var pop_value = document.getElementById("p");
    var current_wage_value = document.getElementById("wage_range").value;
    var current_pop_value = document.getElementById("estPop_range").value;
    //population range
    var rangeP = dataVis.getColumnRange(4);//estimated popu
    var maxP = rangeP.max;
    var minP = rangeP.min;
    console.log("max pop: ", maxP);
    console.log("min pop: ", minP);
    //insert to html
    wage_min.min = min;
    wage_max.max = max;
    pop_max.max = maxP;
    pop_min.min = minP;
    wage_value.value = current_wage_value;
    pop_value.value = current_pop_value;
    var avg_value=0;

    




    // console.log(keys);
    var rowInds = dataVis.getSortedRows([{column: 5}]);
        for (var i = 0; i < rowInds.length; i++) {
            var v = dataVis.getValue(rowInds[i], 6);
           // console.log("v: ", v);  
           dataVis.setRowProperty(rowInds[i], )
        }
    //     avg_value = max/rowInds.length;
    //     console.log(avg_value);
    //     const keys = dataVis.getFilteredRows([{column: 6, minValue: avg_value, maxValue: max}]);
    //     console.log(keys);
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
    var formatter = new google.visualization.ColorFormat();
    formatter.addRange(0, current_wage_value, "red");
    table.draw(dataVis, options);
}
function pullData() {
    avgValue= document.getElementById("wage_range").value;
    estValue = document.getElementById("estPop_range").value; 
   $("#w").text(avgValue);
   $("#p").text(estValue);
}