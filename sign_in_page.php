<?php include_once('inc/header.php'); ?>

  <div class="container-fluid">
    <h2 class="signin text-center"> Sign in</h2>
      <form class="form-group container" action="form_mysql_signin.php" method="post">
        <!-- INCLUDE FONT AWESOME -->
        <div>
          <label> Username </label>
            <input type="text" name="username" class="form-control" required>
        </div>

        <div>
          <label> Password</label>
            <input type="text" name= "password_sign_in" class="form-control" required>
        </div>
      </form>
  </div>

<?php include_once('inc/header.php'); ?>
