<?php

require_once('config/login.php');
require_once('config/db.php');

// Initialize message variables
$msg = '';
$msgClass = '';

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
    // Salting password..check login.php for salts
    $token = hash('ripemd128', "$salt1$password$salt2"); // CHECK IF RIPEMD128 IS STILL SAFE

    // Query the database
    $query = "INSERT INTO users VALUES('$name', '$email', '$username', '$token')";
    $result = $connection->query($query);

    // The main error most likely to be a duplicate error for choosing a username that already
    // exists.

      // If duplicate error, output an error message and redirect to page to input data again
      if($connection->errno === 1062)
      {
        $msg = 'Your chosen username already exists, please choose another';
        $msgClass = 'alert-danger';
      //  header("Location: index.php");
      } else {

      // Begin session and assign session variables
        session_start(); // start the session

        $_SESSION['username'] = $username;
        $_SESSION['password'] = $password;

        $msg = "Successfully created account";
        $msgClass = 'alert-success';
        header("Location: welcome-add-list-page.php");
    }
  }
  else {
    //echo 'Passwords do not match. Try again';
    $msg = "Passwords do not match. Try again";
    $msgClass = 'alert-danger';
    //header("Location: index.php");
  }
}

// APPLY BRAD'S METHOD LATER

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

<?php include_once('inc/header.php'); ?>
  <div class="container">
    <h1 id="main-header"> My To Do</h1> <!-- Think of a better app name -->
    <h5 id="sub-header"> Manage your day </h5>

<!-- output the necessary alert for error and successful logins -->
  <?php if($msg !=''): ?>
      <div class="<?php echo $msgClass; ?>">
        <?php echo $msg; ?></div>
    <?php endif; ?>

    <!-- Add font awesome user icon -->
    <div id="user">
      <i class="fas fa-user fa-3x"></i>
    </div>

    <!-- Form -->
      <form class="form" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
        <div id="signup">
          <h2>Sign Up</h2>
        </div>
          <div class="form-item">
            <input type="text" name="name" value="<?php echo isset($_POST['name']) ? $name: ''; ?>" required placeholder="Enter first name only">
          </div>
          <div class="form-item">
            <input type="email" name="email" value="<?php echo isset($_POST['email']) ? $email: ''; ?>" required placeholder="Enter email">
          </div>
          <div class="form-item">
            <input type="text" name="username" value="<?php echo isset($_POST['username']) ? $usernamme: ''; ?>" required placeholder="Enter a username">
          </div>
          <div class="form-item">
            <input type="password" name="password" required placeholder="Enter password">
          </div>
          <div class="form-item">
            <input type="password" name="password2" required placeholder="Re-type password">
          </div>
          <input type="submit" class="button" value="Create Account">

      <a href="sign_in_page.php">
        <p id="already">Already have an account?</p>
      </a>
      <!-- Add functionality for logging as a guest -->
      </form>

  <footer id="footer">
    <p>
      Amata Media Copyright &copy; 2018
    </p>
  </footer>

  </div> <!-- container class end -->
  <!-- <script src="js/app.js"></script> -->

  </body>
  </html>
