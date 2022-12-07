<?php
// session_start();
// $myfile = fopen("testfile.txt", "a+") or die("unable");
// fwrite($myfile, "attempted login.\n");
// fwrite($myfile, "user: " . $_POST['uid'] . " pass: " . $_POST['pw'] . "\n");
if(isset($_POST['uid']) && isset($_POST['pw'])) {
    include '../../../CPS4745/dbconn.php';
    $userId="";
    $userPw="";
    $login="";
    $pw="";
    $msg = "";
    $data = array();
    $error ="";
    $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
    if (!$mycon) {
        die('Connection error: ' .mysqli_connect_errno());
     } else {
        // $uid = $_POST['uid'];
        // $pw = $_POST['pw'];
        // echo $uid;
        // echo $pw;
        $userId=mysqli_real_escape_string($mycon, $_POST['uid']);
        $userPw=mysqli_real_escape_string($mycon, $_POST['pw']);
        //CHECKING LOGIN AND PASSWORD
        $query = "Select login, password from DV_User where login = ? or password = ?";

        //preparing statement for login
        //initialize connection to db; returns object mysqli stmt
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
                } 
                if (strcmp($userPw, $pw) != 0) {
                    $msg= "Password does not match.";
                } else
                if( (strcmp($userId, $login) == 0) && (strcmp($userPw, $pw) == 0) ) {
                    $msg= "Successful login!";
                    //setcookie and session
                    // setcookie('userId', $userId, time() + 3600, );
                    setcookie('userId', $userId, ['secure'=>true, 'samesite' =>'Lax', 'expires' => time() + 3600,] );
                    $_SESSION['userN'] = $login;
                    $_SESSION['userPw']=$pw;
                }
                header('Content-Type: application/json');
                echo json_encode($msg);
                mysqli_stmt_close($stmt);
                // fwrite($myfile, $msg . "\n");
            }//endofloginelse
        }//else
    mysqli_close($mycon);   
}//ifissetuidandpw
// fclose($myfile);

?>