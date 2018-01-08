<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once './database.php';
include_once './quote.php';
 
$database = new Database();
$db = $database->getConnection();

$maxDate = "2017-12-30 23:00:00";
$minDate = "2017-12-10 00:00:00";

if (isset($_POST['maxDate'])){
    $maxDate = $_POST['maxDate'];
}

if (isset($_POST['minDate'])){
    $minDate = $_POST['minDate'];
}

 
$quote = new Quote($db, $maxDate, $minDate);


$stmt = $quote->read();
$num = $stmt->rowCount();
 
if($num>0){
 
    $quotes_arr=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $quote_item=array(
            "date" => $stockdate,
            "open" => $openprice,
            "high" => $high,
            "low" => $low,
            "close" => $closeprice,
            "volume" => $volume
        );
 
        array_push($quotes_arr, $quote_item);
    }
 
    echo json_encode($quotes_arr);
}
 
else{
    echo json_encode(
        array("message" => "No products found.")
    );
}
?>