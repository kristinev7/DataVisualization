$(document).ready(function() {
    $('#search').click(function() {
        //get passtype
        let checkb=document.querySelectorAll('input[name="pass"]:checked');
        var pass = [];
        checkb.forEach((checkbox) => {
            pass.push(checkbox.value);
        });
            pass =pass.toString();
            var qb = $('#qbn').val();
            var wk = $('#week').val();//get value of wk
            var jsonPass = JSON.stringify(pass);//turn pass into json string
            var yr = $("#s:checked").val();//getseasonvalue
            if( (wk === "") || (pass.length <= 0) || (yr === undefined) || (qb === " ")) {
                alert("Please select a quarterback, week, a season, and pass type.");
            } else {
                // console.log(wk);
                // console.log(jsonPass);
                // console.log(yr);    
                // console.log(qb);
                loadData(wk, jsonPass, yr, qb);
            }   
    });
});

function loadData(wk, pass, s, name) {
    $.ajax({
        url: './fetchdata.php',
        type: 'POST',
        data: {wk:wk, pass:pass, s:s, name:name},
        dataType:"json",
        success:function(data)
        {
            console.log(data);
            if(!$.trim(data)){
                alert("no " + pass + " made this week");
            } else {
                drawChart(data);
            }
        },
            error : function (xmlHttpRequest, textStatus, errorThrown) {
                alert("Error " + errorThrown);
            }
    })//endofajax
}//endofloaddatafunction

//drawfunction
function drawChart(data) {
    var jsonData = data;
    var info = new google.visualization.DataTable();
    info.addColumn('string', 'pass');
    info.addColumn('number', 'x');
    info.addColumn('number', 'y');
    // info.addColumn('string', 'color');
    // info.addColumn('number', 'size');
    $.each(jsonData, function (i, jsonData) {
        var ptype = jsonData.pass;
        console.log(ptype);
        var x = parseFloat(jsonData.x);  //parseFloat($.trim(jsonData.x));
        console.log(x);
        var y = parseFloat(jsonData.y); //parseFloat($.trim(jsonData.y));
        console.log(y);
        // var c = jsonData.color;
        // console.log(c);
        // var s = jsonData.size;
        // console.log(s);
        info.addRows([[ptype, x, y]]);
    });
    var options = {
        hAxis: {
            title: "X",
            gridlines: {color: '#333', minSpacing: 10, count: 53.3/2},
        },
        vAxis: {
            title: "Y",
            ticks: [-10, 0, 10, 20, 30, 40, 50],
            gridlines:{ minSpacing: 10, count:100}
        },
        bubble: {
            textStyle: {
                fontSize: 12,
                fontName: 'Times-Roman',
                color: 'black',
                bold: true,
                italic: true
            }
        },
        backgroundColor: 'transparent',
        chartArea:{backgroundColor:'green'},
        //colorAxis: {values: [1, 2, 3, 4], colors: ['blue', 'yellow', 'orange', 'red']},
        //legend: 'none',
        sizeAxis:{maxSize:10,minSize:1}
    };
        var chart = new google.visualization.BubbleChart(document.getElementById('chart'));
        chart.draw(info, options);
}//endofdrawChart
