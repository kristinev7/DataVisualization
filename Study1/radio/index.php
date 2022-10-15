<?php
    include '../../../CPS4745/dbconfig.php';
    $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
    if (!$mycon) {
        die('Connection error: ' . mysqli_connect_errno());
    } else {
        echo "success\n";
        $sql = "Select distinct(week) from tb20 order by week asc";
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
                        <input type="radio" id="p" name="pass" value="interception"/>
                        <label>interception</label><br>
                        <input type="radio" id="p" name="pass" value="complete"/>
                        <label>completion</label><br>
                        <input type="radio" id="p" name="pass" value="incomplete"/>
                        <label>incomplete</label><br>
                        <input type="radio" id="p" name="pass" value="touchdown"/>
                        <label>touchdown</label><br>                  
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


   


