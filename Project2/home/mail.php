<?php

// if(!isset($_COOKIE['userId'])) {
//     $msg = "Please log in first";
//     echo json_encode($msg);
// 	exit();
// } else {
        include '../../../CPS4745/dbconn.php';
        
        //include '../dbconfig.php';
        // $recipient = $_POST['recipient'];
        // $subject = $_POST['subject'];
        // $pref = $_POST['preferences'];
        // $from = "venelesk@kean.edu";
        // $headers = "From: " . $from;
        $recipient = 'venelesk@kean.edu';
        $subject = 'test';
        $pref = '23423, 2343, bar, pie';
        $from = "venelesk@kean.edu";    
        $type = 'plain'; // or HTML
        $charset = 'utf-8'; 
          
        $mail     = 'no-reply@'.str_replace('www.', '', $_SERVER['SERVER_NAME']);
        $uniqid   = md5(uniqid(time()));
        $headers  = 'From: '.$mail."\n";
        $headers .= 'Reply-to: '.$mail."\n";
        $headers .= 'Return-Path: '.$mail."\n";
        $headers .= 'Message-ID: <'.$uniqid.'@'.$_SERVER['SERVER_NAME'].">\n";
        $headers .= 'MIME-Version: 1.0'."\n";
        $headers .= 'Date: '.gmdate('D, d M Y H:i:s', time())."\n";
        $headers .= 'X-Priority: 3'."\n";
        $headers .= 'X-MSMail-Priority: Normal'."\n";
        $headers .= 'Content-Type: multipart/mixed;boundary="----------'.$uniqid.'"'."\n";
        $headers .= '------------'.$uniqid."\n";
        $headers .= 'Content-type: text/'.$type.';charset='.$charset.''."\n";
        $headers .= 'Content-transfer-encoding: 7bit';
        echo $recipient;
        echo $pref;
        echo $headers;
        $return = mail($recipient, $subject, $pref, $headers);
       
        echo json_encode($return);
    
