<?php
    #include '../../../CPS4745/dbconfig.php'; #connection to laptoplocalhost
    include '../../../CPS4745/desktopConn.php'; #connection to desktoplocalhost
    $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);//connection
    //check connection
    if(!$mycon) {
        die('Connection error: ' . mysqli_connect_errno());
    } else {
        //get data from table
        $qbname = "Select distinct name from tombrady order by name asc";
        $result = mysqli_query($mycon, $qbname);
        $week = "select distinct week from tombrady order by week asc";
        $resW = mysqli_query($mycon, $week);
        // echo "success\n";
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
        <script src= "viewdata.js"></script>
        <script type="text/javascript"> 
                    google.charts.load('current', {'packages':['corechart']});
                    google.charts.setOnLoadCallback();</script>
    </head>
<body>
    <div class="container">
        <div class="row">
            <div>
                <form>
                    <p>Select season:</p>
                    <input type="radio" id="s" name="year" value="2017"/>
                    <label>2017</label>
                    <input type="radio" id="s" name="year" value="2018"/>
                    <label>2018</label>
                    <input type="radio" id="s" name="year" value="2019"/>
                    <label>2019</label>
                    <input type="radio" id="s" name="year" value="2020"/>
                    <label>2020</label><br>
                    <!-- get qb-->
                    <label for="qbn">Choose a quarterback: </label>
                    <select name="qbname" id="qbn" required>
                        <option value="">None</option>
                        <?php
                            while($row=mysqli_fetch_array($result))
                            {
                                echo '<option value="'.$row[0].'">'.$row[0].'</option>';
                            }
                        ?>
                    </select>
                    <!-- getweek -->
                    <label for="week">Choose a week: </label>
                    <select name="week" id="week" required>
                        <option value="">None</option>
                        <?php
                        while($row=mysqli_fetch_array($resW))
                        {
                            echo '<option value="'.$row[0].'">'.$row[0].'</option>';
                        }
                        ?>
                    </select>
                    <!--get pass -->
                    <p>Select a Pass Type: </p>
                    <input type="checkbox" id="p1" name="pass" value="interception">
                        <label for="p1">interception</label><br>
                        <input type="checkbox" id="p2" name="pass" value="complete">
                        <label for="p2">completion</label><br>
                        <input type="checkbox" id="p3" name="pass" value="incomplete">
                        <label for="p3">incomplete</label><br>
                        <input type="checkbox" id="p4" name="pass" value="touchdown">
                        <label for="p4">touchdown</label><br>                      
                </form>
                <div>
                        <button type="button" name="search" id="search">Search</button>
                    </div><!-- searchbutton -->
            </div>
        </div><!--endofclassrow -->
    </div><!--endofclasscontainer -->
    <div class="chart_area">
        <div id="chart" style="width: 1000px; height: 620px;"></div>
    </div>
</body>
</html>

