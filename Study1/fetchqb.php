<?php
//  include 'dbconfig.php';
// //$qb = $_POST["qbname"];
// $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
// if (!$mycon) {
//     die('Connection error: ' . mysqli_connect_errno());
// } else {
//     echo "hello\n";
// }
if(isset($_POST["stat"]))
{
    include 'dbconfig.php';
    $data = array();
    $name = $_POST["stat"];
        $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
        if (!$mycon) {
		    die('Connection error: ' . mysqli_connect_errno());
	    } else {
            // echo "hello\n";
            // echo $name . "\n";
            $query = "SELECT * FROM `{$name}` WHERE name like '$name' and season = 2020";
            // echo $query . "\n";
            $result = mysqli_query($mycon, $query);
                foreach($result as $row)
                    {   
                        $data[] = array (
                            'team' => $row['team'],
                            'week' => $row['week'],
                            'name' => $row['name'],
                            'pass' => $row['pass'],
                            'x' => floatval($row['x']),
                            'y' => floatval($row['y']),
                            'season' => $row['season']
                        );
                    }
                    header('Content-Type: application/json');
                    echo json_encode($data);  
                    exit();         
                }//endofelse
}
?>
 