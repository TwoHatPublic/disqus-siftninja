<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST'); 
header('Content-Type: application/json;');

$api_key = "TJ5BHC4WguB2Nc9D1cinF8S3CgdUO5VQqYdVM5tRNyECTDd6Elzy65K0dFvfUO3P";
$access_token = "cb50c58695ea47d7b597be63ebb44ebe";

$endpoint = $_GET['endpoint'];
$post = $_GET['post'];
$message = urlencode($_GET['message']);

$url = "https://disqus.com/api/3.0/posts/".$endpoint.".json?api_key=".$api_key."&access_token=".$access_token;
$url = $url . "&post=" . $post;
if ($endpoint == "update") {
    $url = $url . "&message=" . $message;
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

echo $response;

?>