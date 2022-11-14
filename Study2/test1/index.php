<?php
    include '../dbconfig.php';
    $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
    if(!$mycon) {
        die ('Connection error: ' . mysqli_connect_errno());
    } 
    else {
        //echo "success\n";
        $sql = "select distinct(state) from datamining.vDV_Data1 order by state";
        $result = mysqli_query($mycon, $sql);
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>State Data</title>
    </head>
    <body>
        <h1 align='center'>State Data</h1>
        <div>
            <form>
                <p>Choose data:</p>
                <input type="radio" id="d" name="data" value="Wages"/>
                <label>Wages</label>
                <input type="radio" id="d" name="data" value="Population"/>
                <label>Population</label>
            </form>
        </div>
        <div>
            <button type="button" name="show" id="show">Show Data</button>
        </div>
        <svg id="canvas">

        </svg>
        <script src="script.js"></script>
    </body>
</html>