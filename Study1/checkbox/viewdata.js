
$(document).ready(function() {
    $('#search').click(function(){
        let checkb =document.querySelectorAll('input[name="pass"]:checked');
            var pass = [];
            checkb.forEach((checkbox) => {
                   pass.push(checkbox.value);
           });
                   pass = pass.toString(); 
        var wk = $('#week').val();
        var jsonPass = JSON.stringify(pass);
        if ((wk !== "") && (pass.length !== 0)) {
            console.log(wk);
            console.log(jsonPass);
            loadData(wk, jsonPass);
        } else {
            alert("Please select pass and week type");
        } 
    });
});

function loadData(wk, pass) {
    $.ajax({
                url:'./fetchdata.php',
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
            }); //endofajax
    }//endofloaddatafunct

    //drawchart func.
function drawChart(data) {
    var jsonData = data;
    var info = new google.visualization.DataTable();
    info.addColumn('string', 'pass');
    info.addColumn('number', 'x');
    info.addColumn('number', 'y');
    info.addColumn('string', 'color');
    info.addColumn('number', 'size');
    $.each(jsonData, function (i, jsonData) {
        var ptype = jsonData.pass;
        console.log(ptype);
        var x = parseFloat(jsonData.x);  //parseFloat($.trim(jsonData.x));
        console.log(x);
        var y = parseFloat(jsonData.y); //parseFloat($.trim(jsonData.y));
        console.log(y);
        var c = jsonData.color;
        console.log(c);
        var s = parseInt(jsonData.size);
        console.log(c);
        info.addRows([[ptype, x, y, c, s]]);
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
                italic: true,
                
            }
        },
        backgroundColor: 'transparent',
        chartArea:{backgroundColor:'green'}

    };
        var chart = new google.visualization.BubbleChart(document.getElementById('chart'));
        chart.draw(info, options);
}//endofdrawChart

