<?php
$msg="";
if(!isset($_COOKIE['userId'])) {
    $msg = "Please log in first!";
    echo json_encode($msg);
    exit();
 } else {
    // $msg = "success";
    // echo json_encode($msg);
    $id = $_POST['id'];
    $login = $_POST['login'];
    $avgV = $_POST['avgValue'];
    $estV = $_POST['estValue'];
    // echo json_encode($id);
    
    if(isset($id)) {
        //include '../../../CPS4745/dbconn.php';
        include '../dbconfig.php';
        $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
        if (!$mycon) {
            die('Connection error: ' . mysqli_connect_errno());
        }
        $sql = "INSERT INTO 2022F_venelesk.User_Setting (uid, login, avgWages, EstimatedPopulation, dateSaved)
        VALUES ($id, '$login', $avgV, $estV, curdate()) ON DUPLICATE KEY UPDATE uid = $id, login = '$login', avgWages=$avgV, EstimatedPopulation=$estV, dateSaved= curdate()";
        mysqli_query($mycon, $sql);
        $affected = mysqli_affected_rows($mycon);
        if($affected > 1 ) {
            $msg = "Saved successfully";
            header('Content-Type: application/json');
            echo json_encode($msg);
        } else
        if ($affected == -1) {
            $msg = "Error! Did not save!";
            header('Content-Type: application/json');
            echo json_encode($msg);
        }  
       
    }//endofifisset
    
}//endofelse