
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
                        // console.log(data[0]['season']);
                        // console.log(data[0]['away_team']);
                        // console.log(data[0]['team']);
                        var team = data[0]['team'];
                        var op_team = data[0]['away_team'];
                        var season = data[0]['season'];
                        if( team===op_team){
                            op_team = data[0]['home_team'];
                        }
                        var winner= score(data[0]['away_score'], data[0]['home_score']);
                        console.log(winner);
                        drawChart(data);
                        $('#qbdetails').css("display", "block");
                        $('#opp_team').text(op_team);
                        $('#season').text(season);
                        $('#result').text(winner);
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
    console.log(jsonData);
    var info = new google.visualization.DataTable();
    info.addColumn('string', 'pass');
    info.addColumn('number', 'x');
    info.addColumn('number', 'y');
    info.addColumn('string', 'color');
    info.addColumn('number', 'size');
    $.each(jsonData, function (i, jsonData) {
        var ptype = jsonData.pass;
        console.log(ptype);
        var x = parseFloat(jsonData.x);  
        console.log(x);
        var y = parseFloat(jsonData.y); 
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
        chartArea:{backgroundColor:'green'},
        colorAxis: {values: [1, 2, 3, 4], colors: ['blue', 'yellow', 'orange', 'red']},
        legend: 'none',
        sizeAxis:{maxSize:10,minSize:1}
    };
        var chart = new google.visualization.BubbleChart(document.getElementById('chart'));
        chart.draw(info, options);
}//endofdrawChart

//getgameresult
function score(s1, s2){
    if(s1==s2) {
        return "TIE";
    } if (s1<s2) {
        return "Loser";
    } else {
        return "Winner";
    }
}
