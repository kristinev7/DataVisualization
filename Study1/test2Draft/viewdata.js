
$(document).ready(function() {
    $('#search').click(function(){
        var wk = $('#week').val();
        var pass = $("#p:checked").val();
        if(wk != '')        
        {
            loadData(wk, pass);
        } else {
            alert("Please select week");
        }
    });
});

function loadData(wk, pass) {
    $.ajax({
                url:'fetchdata.php',
                type:"POST",
                data:{wk:wk, pass:pass},
                dataType:"json",
                success:function(data)
                {
                    console.log(data);
                    if(!$.trim(data)) {
                        alert("no " + pass + " made this week");
                    } else {
                        drawChart(data);
                    }
                },
                    error : function (xmlHttpRequest, textStatus, errorThrown) {
                    alert("Error " + errorThrown);
                //error thrown: Error SyntaxError: JSON.parse: 
                //unexpected character at line 1 column 2 of the JSON data
                 }
            });
    }//endofloaddatafunct

    //drawchart func.
    function drawChart(data) {
    var jsonData = data;
    var info = new google.visualization.DataTable();
    info.addColumn('string', 'pass');
    info.addColumn('number', 'x');
    info.addColumn('number', 'y');
    $.each(jsonData, function (i, jsonData) {
        var ptype = jsonData.pass;
        console.log(ptype);
        var x = parseFloat($.trim(jsonData.x));
        console.log(x);
        var y = parseFloat($.trim(jsonData.y));
        console.log(y);
        info.addRows([[ptype, x, y]]);
    });
    var options = {
        hAxis: {
            title: "X"
        },
        vAxis: {
            title: "Y"
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
        chartArea:{backgroundColor:'green'}

    };
        var chart = new google.visualization.BubbleChart(document.getElementById('chart'));
        chart.draw(info, options);
}//endofdrawChart

