<?php
    include '../../../CPS4745/dbconn.php';
    $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
    if (!$mycon) {
        die('Connection error: ' .mysqli_connect_errno());
     } else {
        $userId = 'tiger';
        $userPw = '5920';
        $msg="";
        $query = "Select login, password from DV_User where login = ? and password = ?";
        
        $stmt = mysqli_stmt_init($mycon); 
        if (!mysqli_stmt_prepare($stmt, $query)) 
        {
            $msg= "SQL Prepare Statement failed";
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $userId, $userPw);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_bind_result($stmt, $login, $pw);
            mysqli_stmt_fetch($stmt);
                if (strcmp($userId, $login) != 0) {
                    $msg= "Login " . $userId . " doesn't exist in the database.";
                } else if (strcmp($userPw, $pw) != 0) {
                    $msg= "Password " . $userPw . " does not match.";
                } else if( (strcmp($userId, $login) == 0) && (strcmp($userPw, $pw) == 0) ) {
                    $msg= "Successful login!";
                }
                
                echo ($msg);
                mysqli_stmt_close($stmt);
            }
     }
?>