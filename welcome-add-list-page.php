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

if(isset($_POST['signout'])){
  // Destroy session and redirect to sign_in_page
  session_destroy();
  header("Location: sign_in_page.php");
}

if(!isset($_SESSION['username'])){
  // Redirect to sign_in_page
  header("Location: sign_in_page.php");
}

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>To Do App</title>
    <link rel="stylesheet" href="css/welcome.css">
    <link rel="stylesheet" href="web-fonts-with-css/css/fontawesome-all.min.css">
  </head>
  <body>

      <div class="container">
        <div id="greeting">
          <h2><span id="greet"></span> <?php echo $row[0]?></h2>
        </div>
        <div class="time">
          <span id="hour"></span><span id="min"></span>
          <span id="date"></span>
        </div>
        <br>

        <p id="what"> What are we doing today? </p>

        <!-- Form input for the day's activities -->
        <form id="form">
          <input type="text" id="item">
        </form>

        <ul id="list">
          <!-- <li class="listItems"></li> -->
        </ul>

        <!-- Sign out button -->
        <form action="<?php $_SERVER['PHP_SELF']; ?>" method="post">
          <input type="submit" id="signout" name="signout" value="Sign out">
        </form>

  <footer id="footer">
    <p>
      Amata Media Copyright &copy; 2018
    </p>
  </footer>

  </div> <!-- container class end -->

  <!-- <script src="./js/jquery-3.3.1.slim.js"></script> -->
  <script src="js/welcome.js"></script>
  </body>
  </html>
