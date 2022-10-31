<?php
// session_start();
$msg="";
if (!isset($_COOKIE['userId'])) {
    $msg = "Please log in first";
    echo json_encode($msg);
	exit();
}  else 
     if(isset($_COOKIE['userId']))
     {
        unset($_COOKIE['userId']); 	
        setcookie('userId', '', time()-3600); 
        $msg = "Successfully Logout!";
        header('Content-Type: application/json');
        echo json_encode($msg);	
     }
    // session_destroy();
?>