<?php
    include '../dbconfig.php';
    $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
    if (!$mycon) {
        die('Connection error: ' . mysqli_connect_errno());
    } else {
        echo "success\n";
        $sql = "Select distinct(week) from tb20";
        $result = mysqli_query($mycon,$sql);
        
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Pass Stats</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div>
                    <form>
                        <label for="week">Choose a week:</label>
                        <select name="week" id="week" required>
                            <option value="">None</option>
                            <?php
                            while($row=mysqli_fetch_array($result))
                            {
                                echo'<option value="'.$row[0].'">'.$row[0].'</option>';
                            }
                            ?>
                        </select>
                        <p>Select a Pass Type:</p>
                        <input type="radio" id="p" name="pass" value="interception">
                        <label for="2017">interception</label><br>
                        <input type="radio" id="p" name="pass" value="complete">
                        <label for="2017">completion</label><br>
                        <input type="radio" id="p" name="pass" value="incomplete">
                        <label for="2017">incomplete</label><br>
                        <input type="radio" id="p" name="pass" value="touchdown">
                        <label for="2017">touchdown</label><br>                   
                    </form>
                    <div>
                        <button type="button" name="search" id="search" class="btn btn-info">Search</button>
                    </div>
                </div>
            </div>
        </div><!--container-->
        <div class = "chart_area">
            <div id="chart" style="width: 1000px; height: 620px;"></div>
        </div>
    </body>
</html>

<script type="text/javascript"> 
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback();
//get the data
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
                        alert("no completion made this week");
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
                color: 'green',
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
//drawchart funct.
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
</script>

<script>
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
</script>     
