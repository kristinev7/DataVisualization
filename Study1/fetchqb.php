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
            echo "hello\n";
            echo $name;
            $query = "SELECT * FROM qbpasses WHERE name = '.$name.'";
            $result = mysqli_query($mycon, $query);
                foreach($result as $row)
                    {   
                        $data[] = array (
                            'team' => $row['team'],
                            'week' => $row['week'],
                            'name' => $row['name'],
                            'pass type' => $row['pass_type'],
                            'x' => floatval($row['x']),
                            'y' => floatval($row['y']),
                            'season' => $row['season']
                        );
                        // $data["team"] = $row["team"];
                        // $data["week"] = $row["week"];
                        // $data["name"] = $row["name"];
                        // $data["pass_type"] = $row["pass_type"];
                        // $data["x"] = $row["x"];
                        // $data["y"] = $row["y"];
                        // $data["season"] = $row["season"];
                       
                    }
                    header('Content-Type: application/json');
                    echo json_encode($data);  
                    exit();         
                }//else
}
?>
 