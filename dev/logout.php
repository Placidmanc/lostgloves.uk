<?php

session_start();

unset($_SESSION);
if (isset($_COOKIE[session_name()])) {
	setcookie(session_name(), '', time()-60);
}
session_destroy();

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
		
			<h2>You are now logged out. Log in.</h2>
		
			

		</div>
		
	</div>
	
	
	
	
	
	<?php include 'footer.php'; ?>

