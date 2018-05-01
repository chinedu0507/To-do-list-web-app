<?php

require_once 'login.php';
$connection = new mysqli($db_hostname, $db_username, $db_password, $db_database);
if($connection->connect_error) die($connection->connect_error);

if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['username']) &&
isset($_POST['password']) && isset($_POST['password2']))
{
  // Place inputs from users into variables
  $name = get_post($connection, $_POST['name']);
  $email = get_post($connection, $_POST['email']);
  $username = get_post($connection, $_POST['username']);
  $password = get_post($connection, $_POST['password']);
  $password2 = get_post($connection, $_POST['password2']);

  if($password === $password2)
  {
    // Salting password
    $token = hash('ripemd128', "$salt1$password$salt2");

    // Query the database
    $query = "INSERT INTO users VALUES('$name', '$email', '$username', '$token')";
    $result = $connection->query($query);

    // The main error most likely to be a duplicate error for choosing a username that already
    // exists.

      // If duplicate error, output an error message and redirect to page to input data again
      if($connection->errno === 1062)
      {
        echo "Your chosen username already exists, please choose another <br>";
        header("Location: index.php");
      }
     else {

      // Begin session and assign session variables
        session_start(); // start the session

        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;

        header("Location: welcome-add-list-page.php");
    }
  }
  else {
    echo "Passwords do not match. Try again";
    header("Location: index.php");
  }
}


// Functions to handle user input securely
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
