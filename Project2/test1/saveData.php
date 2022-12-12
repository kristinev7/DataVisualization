<?php
$msg="";
if(!isset($_COOKIE['userId'])) {
    $msg = "Please log in first!";
    echo json_encode($msg);
    exit();
} else {
    // $msg = "success";
    // echo json_encode($msg);
    include '../../../CPS4745/dbconn.php';
    

}