<?php

session_start();

require_once ('config/login.php');
require_once ('config/db.php');

// Sign in Case
if(isset($_POST['username_sign_in']) && isset($_POST['password_sign_in']))
{
  $username_sign_in = get_post($connection, $_POST['username_sign_in']);
  $password_sign_in = get_post($connection, $_POST['password_sign_in']);

  // Querying database
  $query = "SELECT * FROM users WHERE username='$username_sign_in'";
  $result = $connection->query($query);

  if(!$result) die($connection->error);

  else {
      $result->num_rows;
      $row = $result->fetch_array(MYSQLI_NUM);

      $password_sign_in = hash('ripemd128', "$salt1$password_sign_in$salt2");

      if($password_sign_in == $row[3]) {
        session_start(); // start the session

        $_SESSION['username'] = $username;
        header("Location: welcome-add-list-page.php");
      }
      else
        {
          echo "Wrong username and password pair <br>";
          header("Location: sign_in_page.php");
        }
      }

}
  else
    {
          echo "Wrong username and password pair <br>";
          header("Location: sign_in_page.php");
    }

$result->close();
$connection->close();

function get_post($conn, $var)
{
  return htmlentities(fix_string($conn, $var));
}

function fix_string($conn, $var)
{
    if (get_magic_quotes_gpc()) $var = stripslashes($var);
    return $conn->real_escape_string($var);//($_POST[$var]);
}

?>
