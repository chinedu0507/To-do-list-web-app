<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>To Do App</title>
    <link rel="stylesheet" href="css/styles_signin.css">
    <link rel="stylesheet" href="web-fonts-with-css/css/fontawesome-all.min.css">
  </head>
  <body>

  <div class="container">
    <h1 id="main-header"> My To Do</h1> <!-- Think of a better app name -->
    <h5 id="sub-header"> Manage your day </h5>

    <div id="user"><i class="fas fa-user fa-3x"></i></div>

      <form class="form" action="form_mysql_signin.php" method="post">
        <div id="signin">
            <h2> Sign in</h2>
        </div>
        <div class="form-item">
            <input type="text" name="username_sign_in" required placeholder="Enter username">
        </div>
        <div class="form-item">
            <input type="password" name= "password_sign_in" required placeholder="Enter password">
        </div>
        <input class="button" type="submit" value="Sign in">
        <br>
        <a href="#"> <!-- Activate this link -->
          <!-- block or suggest after 3 failed sign in attempts -->
          <p id="forgot">Forgot your password?</p>
        </a>
      </form
  </div>
<script type="text/javascript">
  document.addEventListener("DOMContentLoaded", function(){
    sessionStorage.clear();
  });
</script>
<?php include_once('inc/footer.php'); ?>
