<?php
if(!isset($_COOKIE['userId'])) {
    $msg = "Please log in first";
    echo json_encode($msg);
	exit();
} else {
        //include '../../../CPS4745/dbconn.php';
        include '../dbconfig.php';
        $recipient = $_POST['recipient'];
        $subject = $_POST['subject'];
        $pref = $_POST['preferences'];
        $from = "venelesk@kean.edu";
        $headers = "From: " . $from;

        $return = mail($recipient, $subject, $pref, $headers);
        echo json_encode($return);
    
}