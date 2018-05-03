<?php

require_once('datacon.php');
require("passwordHash.php");


session_start();

function validateUser($id, $Username){
    session_regenerate_id();
	$_SESSION['userid'] = $id;
	$_SESSION['valid'] = 1;
}
function isLoggedIn(){
    if(isset($_SESSION['valid']) && $_SESSION['valid'])
        return true;
    return false;
}
if(isLoggedIn()){
	header('Location: index.php');
    die();
}





$editFormAction = $_SERVER['PHP_SELF'];
if (isset($_SERVER['QUERY_STRING'])) {
	$editFormAction .= "?" . htmlentities($_SERVER['QUERY_STRING']);
}
if ((isset($_POST["MM_insert"])) && ($_POST["MM_insert"] == "logIn")) {

	$errors = array();

	$_POST = array_map('trim', $_POST);
	$username = $_POST['uname'];
	$password = $_POST['pword'];
	
	try 
	{
		$conn = new PDO("mysql:host=$dbhost;dbname=$dbdata", $dbuser, $dbpass);
		$stmt = $conn->prepare("SELECT ID, UName, Password FROM users WHERE UName = :Username;");
		$stmt->bindParam(':Username', $username, PDO::PARAM_STR); 
		$stmt->execute();
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		$row_count = $stmt->rowCount();
	}
	catch(PDOException $e) 
	{
		$errors[] = $e->getMessage();
	}


	if($row_count < 1){
	   $errors[] = 'No such user exists';
	}
	
	
	
	$hasher = new PasswordHash(8, false);
	$stored_hash = "*";
	$stored_hash = $result['Password'];
	$check = $hasher->CheckPassword($password, $stored_hash);
	
	if(!$check){
		$errors[] = "Incorrect password";
	}
	else
	{
		validateUser($result['ID'], $result['UName']); 
	}
	
}

if ($_POST && !$errors) {
	header('Location: index.php');
}   

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

  
    <title>Login to Lost Gloves</title>
	
	
	<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500" rel="stylesheet">

    <link rel="stylesheet" href="css/lostgloves-styles.css">
	
	
	
  </head>
  <body>
    
	
	<?php include_once("analyticstracking.php") ?>
	
	
	
	
	<div class="header">
	
		<div class="socialBarTop">
			<ul class="social">
				<li><a href="draw.html"><img src="imgs/facebook_logo.png" /></a></li>
				<li><a href="gloves.html"><img src="imgs/twitter_logo.png" /></a></li>
				<li><a href="about.html"><img src="imgs/google+_logo.png" /></a></li>
			</ul>
		</div>
	
		<div class="menuLine"></div>
		
		<div class="headerWrapper">
		
			<img src="imgs/lostgloves-logo.png" class="hdrLogo" />
			
			<div class="menu">
				<ul class="nav-justified">
					<li><a href="index.php">home</a></li>
					<li><a href="gloves.php">gloves</a></li>
					<li><a href="draw.php">draw</a></li>
					<li><a href="about.php">about</a></li>
					<li><a href="contact.php">contact</a></li>
					<li><a href="signup.php">sign up</a></li>
					<li class="active"><a href="login.php">log in</a></li>
				</ul>
			</div>
		</div>
		
	</div>
	
	
	
	<div class="loginFormHolder">

		<div class="loginForm">
		
			<form name="login" action="<?php echo $editFormAction; ?>" method="post">
		
				<div class="formfield"><input autocomplete="new-uname" type="text" size="25" maxlength="30" name="uname" value="" class="textinput" placeholder="Username" /></div>
				
				<div class="formfield"><input type="password" autocomplete="new-password" size="25" name="pword" maxlength="12" value="" class="textinput" placeholder="Password" /></div>

				<input type="hidden" name="MM_insert" value="logIn" />
				
				<?php
					if ($_POST && $errors) {
						echo '<div class="errors"><ul id="errorlist">';
							foreach ($errors as $error) {
								echo "<li>$error</li>";
							}
						echo '</ul></div>';
					} 
				?>
				
				<div class="submitBtn"><input type="submit" name="submit" value="sign in" /></div>  

			</form>
			
			<div class="forgotLink"><a href="forgotpassword.php">Forgot password?</a></div>

		</div>
		
	</div>
	
	
	
	
	
	<?php include 'footer.php'; ?>