<?php
    include '../../../CPS4745/dbconfig.php';
    $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
    if($mycon) {
        die ('Connection error: ' . mysqli_connect_errno());
    } else {
        
    }
?>