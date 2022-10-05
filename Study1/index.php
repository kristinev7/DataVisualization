<?php
    include 'dbconfig.php';
    $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
    if (!$mycon) {
        die('Connection error: ' . mysqli_connect_errno());
    } else {
        echo "success\n";
        $sql="SELECT distinct(name) FROM qbpasses";
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
           <div clas="row">
                <div class="col-md-4">
                    <select name="qbname" id="qbname" class="form-control">
                        <option value="">Select QB</option>
                        <?php
                            while($row = mysqli_fetch_array($result))
                            {
                                echo '<option value="'.$row["name"].'">'.$row["name"].'</option>';      
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
                        <td width="10%" align="right">Week</td>
                        <td width="90%"><span id="week"></span></td>
                    </tr>
                    <tr>
                        <td width="10%" align="right">Name</td>
                        <td width="90%"><span id="qb_name"></span></td>
                    </tr>
                    <tr>
                        <td width="10%" align="right">Pass Type</td>
                        <td width="90%"><span id="passstyle"></span></td>
                    </tr>
                    <tr>
                        <td width="10%" align="right">X</td>
                        <td width="90%"><span id="x"></span></td>
                    </tr>
                    <tr>
                        <td width="10%" align="right">Y</td>
                        <td width="90%"><span id="y"></span></td>
                    </tr>
                    <tr>
                        <td width="10%" align="right">Season</td>
                        <td width="90%"><span id="season"></span></td>
                    </tr>
                </table>
            </div>
        </div><!--container--> 
    </body>
</html>

<script>
$(document).ready(function() {
    $('#search').click(function(){
        var stat = $('#qbname').val();      
        if(stat != '')        
        {
            console.log(stat);
            $.ajax({
                //url: window.location.href.split('?')[0] + 'fetchqb.php',
                url: 'fetchqb.php',
                type:"POST",
                data:{stat:stat},
                dataType:"text",
                success:function(row)
                {
                    console.log(row);
                    $('#qbdetails').css("display", "block");
                    $('#qb_team').text(row.team);
                    $('#week').text(row.week);
                    $('#qb_name').text(row.name);
                    $('#passstyle').text(row.pass_style);
                    $('#x').text(row.x);
                    $('#y').text(row.y);
                    $('#season').text(row.season);
                    
                },
                    error : function (xmlHttpRequest, textStatus, errorThrown) {
                    alert("Error " + errorThrown);
                }
            });
        } else {
            alert("Please select QB");
        }
    });
});
 </script>