<?php

// Required files
require_once("config/login.php");
require_once("config/db.php");

session_start(); // start session
$username = $_SESSION['username'];

$query = "SELECT * FROM users WHERE username ='$username'";
$result = $connection->query($query);
if (!$result) die("Error" . $connection->error);

$row = $result->fetch_array(MYSQLI_NUM); //fetch_item instead?

$result->close();
$connection->close();
?>

<?php include_once('inc/header.php');?>
    <div class="container-fluid text-center">
      <h2> Hello <?php echo $row[0]?></h2>
      <hr>

    </div>
    <!-- Modify greetings to be according to times..Good morning, afternoon etc -->

    <!-- ADD LOG OUT BUTTON -->

<?php include_once('inc/header.php');?>
