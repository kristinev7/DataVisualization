<?php
session_start();
$myfile = fopen("testfile.txt", "a+") or die("unable");
fwrite($myfile, "attempted get userinfo.\n");

if(!isset($_COOKIE['userId'])) {
    // echo "please login first"."<br>";
	exit();
} else {
    include '../../../CPS4745/dbconn.php';
    $data= array();
    $user = $_SESSION['userN'];
	$mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
	if (!$mycon) {
		die('Connection error: ' . mysqli_connect_errno());
	}
    //GET USERINFO
        $qry = "select uid, login, name, gender from DV_User where login='$user'";
            $result = mysqli_query($mycon, $qry);
            foreach($result as $row) 
            {
                $data[] = array (
                    'uid' => $row['uid'],
                    'login' => $row['login'],
                    'name' => $row['name'],
                    'gender' => $row['gender']
                );
            }//endofforeach
            header('Content-Type: application/json');
            echo json_encode($data);
            // fwrite($myfile, $data);
            exit();        
    }
mysqli_close($mycon);
fclose($myfile);

?>