<?php
$msg="";
if(!isset($_COOKIE['userId'])) {
    $msg = "Please log in first!";
    echo json_encode($msg);
    exit();
} else {
    // $msg = "success";
    // echo json_encode($msg);
    //include '../../../CPS4745/dbconn.php';
    include '../dbconfig.php';
    $data= array();
	$mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
	if (!$mycon) {
		die('Connection error: ' . mysqli_connect_errno());
	}
        $sql = "select avg(AvgWages) as avgW, avg(EstimatedPopulation) as avgE, min(AvgWages) as minW, max(AvgWages) as maxW, min(EstimatedPopulation) as minP, max(EstimatedPopulation) as maxP from datamining.vDV_Data2";
        $result = mysqli_query($mycon, $sql);
        if (is_array($result) || is_object($result)) {
            foreach($result as $row) {
                $data [] = array (
                    'avgW' => $row['avgW'],
                    'avgE' => $row['avgE'],
                    'minW' => $row['minW'],
                    'maxW' => $row['maxW'],
                    'minP' => $row['minP'],
                    'maxP' => $row['maxP']
                );
            } //endofforeach
        }//endofif
        header('Content-Type: application/json');
        echo json_encode($data);
        exit();
}
    mysqli_close($mycon);
?>