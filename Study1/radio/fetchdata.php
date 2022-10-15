<?php

if(isset($_POST["wk"]) || isset($_POST["pass"]))
{
    include '../../../CPS4745/dbconfig.php';
    $data = array();
    $week= $_POST["wk"];
    $p = $_POST["pass"];
        $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
        if (!$mycon) {
		    die('Connection error: ' . mysqli_connect_errno());
	    } else {
            $query = "SELECT * FROM `tb20` where week={$week} and pass='{$p}'";
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
                            'home_score' =>$row['home_score']
                        );
                    }
                    header('Content-Type: application/json');
                    //print_r($data);
                    echo json_encode($data);  
                    exit();         
                }//endofelse
}
?>