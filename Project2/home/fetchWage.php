<?php
$msg="";
if(!isset($_COOKIE['userId'])) {
    $msg = "Please log in first!";
    echo json_encode($msg);
    exit();
} else {
        // $msg = "success";
        // echo json_encode($msg);
        include '../../../CPS4745/dbconn.php';
        //include '../dbconfig.php';
        $data= array();
        $mycon = mysqli_connect($host, $username, $dbpassword, $dbname);
        if (!$mycon) {
            die('Connection error: ' . mysqli_connect_errno());
        }

    if(isset($_POST['avgValue']) && isset($_POST['estValue'])) {
        $avgV = $_POST['avgValue'];
        $estV = $_POST['estValue'];
        //$msg = $avgV + $estV;
        //echo json_encode($msg);
        $sql = "select * from vDV_Data1;
        $result = mysqli_query($mycon, $sql);
        if ( is_array($result) || is_object($result) ) {
            foreach($result as $row) {
                $data [] = array (
                    'RecordNumber' => $row['RecordNumber'],
                    'Zipcode' => $row['Zipcode'],
                    'ZipCodeType' => $row['ZipCodeType'],
                    'City' => $row['City'], 
                    'State' => $row['State'],
                    'LocationType' => $row['LocationType'],
                    'Latitude' => $row['Latitude'],
                    'Longitude' => $row['Longitude'],
                    'Xaxis' => $row['Xaxis'],
                    'Yaxis' => $row['Yaxis'],
                    'WorldRegion' => $row['WorldRegion'],
                    'Country' => $row['Country'],
                    'LocationText' => $row['LocationText'],
                    'Location' => $row['Location'],
                    'Decommisioned' => $row['Decommisioned'],
                    'TaxReturnsFiled' => $row['TaxReturnsFiled'],
                    'EstimatedPopulation' => $row['EstimatedPopulation'],
                    'TotalWages' => $row['TotalWages'],
                    'AvgWages' => $row['AvgWages'],
                    'Notes' => $row['Notes']
                );
            } //endofforeach
        }//endofif 
        header('Content-Type: application/json');
        echo json_encode($data);
        exit();
    }
}
    mysqli_close($mycon);
?>