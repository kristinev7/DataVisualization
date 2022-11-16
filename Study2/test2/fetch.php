<?php
    if(isset($_GET['data'])) {
        include '../../../CPS4745/dbconfig.php';
        $pop = $_GET['data'];
        $data = array();
        $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
        if (!$mycon) {
		    die('Connection error: ' . mysqli_connect_errno());
	    } else {
            if ($pop == "Estimated Population") {
                $query = "Select State, City, Zipcode, EstimatedPopulation from test.data1";
                $result = mysqli_query($mycon, $query);
                foreach($result as $row) {
                    $data[] = array (
                        'state' => $row['State'],
                        'city' => $row['City'],
                        'zipcode' => $row['Zipcode'],
                        'value' => $row['EstimatedPopulation']
                    );
                }
                header('Content-Type: application/json');
                echo json_encode($data);
            }//endofif
                else if ($pop == "Total Wages") {
                    $query2 = "Select State, City, Zipcode, TotalWages from test.data1";
                    $wageResult = mysqli_query($mycon, $query2);
                    foreach($wageResult as $row) {
                        $data[] = array (
                            'state' => $row['State'],
                            'city' => $row['City'],
                            'zipcode' => $row['Zipcode'],
                            'value' => $row['TotalWages']
                        );
                    }
                    header('Content-Type: application/json');
                    echo json_encode($data);
                }
            exit();  
        }//endofelse
    }
?>