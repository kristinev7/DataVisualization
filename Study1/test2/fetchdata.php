<?php
if(isset($_POST['jsonPass']) && isset($_POST['wk']) && isset($_POST['yr']) && isset($_POST['qb']))
{
     include '../../../CPS4745/dbconfig.php';
    $data = array();
    $wk = $_POST['wk'];
    $yr = $_POST['yr'];
    $qb = $_POST['qb'];
    //echo $qb;
    $pass = json_decode($_GET['pass']);
    $pass = explode(",", $pass); 
    $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
        if (!$mycon) {
		    die('Connection error: ' . mysqli_connect_errno());
	    } else {
            $n=0;
            //echo $wk;
            while($n < sizeof($pass)) {
                $query = "SELECT * FROM tombrady where name = '$qb' and season=$yr and week=$week and pass='{$pass[$n]}'";
                //echo $query;
            // $query = "SELECT * FROM tombrady where name = 'aaron rodgers' and season=2019 and week=2 and pass='incomplete'";
            // echo $query;
                $result = mysqli_query($mycon, $query);
                if (! $result) { echo "query failed."; }
                // foreach($result as $d) {
                //     echo $d['name'];
                // }
                // echo $query; 
                foreach($result as $row) {
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
                        'home_score' =>$row['home_score']
                    );
                }//endofforeach
                $n+=1;
                print_r($data);
            }//endofwhile
                header('Content-type: application/json');
                echo json_encode($data);
                exit();
        }//endofelse
    //connect and get data
}//endofif
?>