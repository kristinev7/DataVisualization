<?php
    include '../../../CPS4745/dbconfig.php';
    $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
    if (!$mycon) {
        die('Connection error: ' . mysqli_connect_errno());
    } else {
        //echo "success\n";
        $sql = "Select distinct(week) from tb20 order by week asc";
        $result = mysqli_query($mycon,$sql);
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Pass Stats</title>
        <h1 align="center">Tom Brady Stats</h1>
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
                    </div>
                </div>
            </div><!-- endofdivclassrow -->
            <br/>
            <div class="table-responsive" id="qbdetails" style="display:none">
                <table class="table table-bordered">
                    <tr>
                        <td width="10%" align="right">Opposing Team</td>
                        <td width="90%"><span id="opp_team"></span></td>
                    </tr>
                    <tr>
                        <td width="10%" align="right">Season</td>
                        <td width="90"><span id="season"></span></td>
                    </tr>
                    <tr>
                        <td width="10%" align="right">Game Result</td>
                        <td width="90"><span id="result"></span></td>
                    </tr>
                </table>
            </div><!--endoftable-->
        </div><!--container-->
        <div class = "chart_area">
            <div id="chart" style="width: 1000px; height: 620px;"></div>
        </div>
    </body>
</html>

