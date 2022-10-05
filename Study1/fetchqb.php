<?php
//  include 'dbconfig.php';
// //$qb = $_POST["qbname"];
// $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
// if (!$mycon) {
//     die('Connection error: ' . mysqli_connect_errno());
// } else {
//     echo "hello\n";
// }
if(isset($_POST["id"]))
{
    include 'dbconfig.php';
    $name = $_POST["id"];
        $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
       // $mycon = mysqli_connect('localhost', "root", '', 'test');
        if (!$mycon) {
		    die('Connection error: ' . mysqli_connect_errno());
	    } else {
            echo "hello\n";
            echo $name;
            $query = "SELECT * FROM qbpasses WHERE name = '".$name."' limit 10";
            $result = mysqli_query($mycon, $query);
                
                    {
                        $data["team"] = $row["team"];
                        $data["week"] = $row["week"];
                        $data["name"] = $row["name"];
                        $data["pass_type"] = $row["pass_type"];
                        $data["x"] = $row["x"];
                        $data["y"] = $row["y"];
                        $data["season"] = $row["season"];
                    }
                    echo json_encode($data);           
                }
}
?>
 <!-- $query = "SELECT * FROM qbpasses WHERE name like '%tom%' "; -->
<!-- while($row = mysqli_fetch_array($result))
                {
                    $name = $row["name"];
                    echo $name;
                } -->