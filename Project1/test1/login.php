<?php
include '../../../CPS4745/dbconn.php';
if(isset($_POST['uid']) && isset($_POST['pw'])) {
    $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
    if (!$mycon) {
        die('Connection error: ' .mysqli_connect_errno());
    } else {

    }//else

}//ifissetuidandpw

?>