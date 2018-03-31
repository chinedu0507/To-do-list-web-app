<?php

require_once('config/login.php');

// Connect to the database using mysqli object
$connection = new mysqli(HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
if($connection->connect_error) die($connection->connect_error);

?>
