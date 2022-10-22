<?php 
if(isset($_POST["pass"]) && isset($_POST['wk']))
{
    include '../../../CPS4745/dbconfig.php';
    $data = array();
    $week= $_POST["wk"];
    $pass = json_decode($_POST["pass"]);
    $pass = explode(",", $pass);
        $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
        if (!$mycon) {
		    die('Connection error: ' . mysqli_connect_errno());
	    } else {
                 $n=0;
                 //print_r($pass);
                 while ($n < sizeof($pass)) {
                     $query = "SELECT * FROM tb20 where week=$week and pass='{$pass[$n]}'";
                     $result = mysqli_query($mycon, $query);
                     if (! $result) { echo "query failed."; }
                    foreach($result as $row)
                        {   
                            $data[] = array (
                                'team' => $row['team'],
                                'week' => $row['week'],
                                'name' => $row['name'],
                                'pass' => $row['pass'],
                                'x' => floatval($row['x']),
                                'y' => floatval($row['y']),
                                'season' => $row['season'],
                                'away_team'=> $row['away_team'],
                                'away_score'=>$row['away_score'],
                                'home_team' =>$row['home_team'],
                                'home_score' =>$row['home_score'],
                                'color' => $row['color'],
                                'size' => $row['size']
                               );
                        }
                        $n+=1;
                        //print_r($data);   
                    }//endofwhile
                        header('Content-Type: application/json');
                        echo json_encode($data);  
                        exit(); 
                 }//endofelse
}//endofif
?>