<?php
    include '../dbconfig.php';
    $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
    if (!$mycon) {
        die('Connection error: ' . mysqli_connect_errno());
    } else {
        echo "success\n";
        //$sql = "Show tables where tables_in_test not like '%qbpasses%'";
        $sql = "Select distinct(week) from `tom brady`";
        $result = mysqli_query($mycon,$sql);
        //$q = $_GET['qbs'];
         //echo "q: " . $q;
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Pass Stats</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </head>
    <body>
        <div class="container" style="width:900px;">
            <h2 align="center"> QB Pass Data </h2>
           <div class="row">
                <div class="col-md-4">
                    <select name="week" id="week" class="form-control">
                        <option value="">Select Week</option>
                        <?php
                            while($row = mysqli_fetch_array($result))
                            {
                                //echo '<option value="'.$row["name"].'">'.$row["name"].'</option>'; 
                                echo '<option value="'.$row[1].'">'.$row[1].'</option>';    
                            }
                        ?>
                   </select> 
                </div> <!--searchdropdown -->
                <div class="col-md-4">
                    <button type="button" name="search" id="search" class="btn btn-info">Search</button>
                </div>
            </div><!--classrow-->
            <br />
            <br/>
            <div class="table-responsive" id="qbdetails" style="display:none">
                <table class="table table-bordered">
                    <tr>
                        <td width="10%" align="right">Team</td>
                        <td width="90%"><span id="qb_team"></span></td>
                    </tr> 
                    <tr>
                        <td width="10%" align="right">Season</td>
                        <td width="90%"><span id="season"></span></td>
                    </tr>
                    <tr>
                        <td width="10%" align="right">Week</td>
                        <td width="90%"><span id="week"></span></td>
                    </tr>
                </table>
            </div>
        </div><!--container--> 
        <div class = "chart_area">
            <div id="chart" style="width: 1000px; height: 620px;"></div>
        </div>
    </body>
</html>

<!-- bubble chart set-up using google charts-->

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback();
//get the data
function loadData(stat, week) {
    $.ajax({
                url:'fetchqb.php',
                type:"POST",
                data:{stat:stat, week:week},
                dataType:"json",
                success:function(row)
                {
                    console.log(row);
                    console.log(row[0]['team']);
                    console.log(row[0]['season']);
                    var t = row[0]['team'];
                    var s = row[0]['season'];
                    var w = row[0]['week'];
                    $('#qbdetails').css("display", "block");
                    $('#qb_team').text(t);
                    $('#season').text(s);
                    $('#week').text(w);
                    drawChart(row);
                },
                    error : function (xmlHttpRequest, textStatus, errorThrown) {
                    alert("Error " + errorThrown);
                    //error thrown: Error SyntaxError: JSON.parse: unexpected character at line 1 column 2 of the JSON data
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

</script><!-- endofchartset-up -->

<script>
$(document).ready(function() {
    $('#search').click(function(){
        var stat = $('#week').val();
        var wk = $('#week').val();      
        if(stat != '')        
        {
            console.log(stat);
            loadData(stat, wk);
            
        } else {
            alert("Please select QB");
        }
    });
});
 </script>


