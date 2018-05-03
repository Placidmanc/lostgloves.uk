<?php

session_start();


?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

  
    <title>Contact Lost Gloves</title>
	
	
	<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500" rel="stylesheet">

    <link rel="stylesheet" href="css/lostgloves-styles.css">
	
	
  </head>
  <body>
    
	
	<?php include_once("analyticstracking.php") ?>
	
	
	
	
	<div class="header">
	
		<div class="socialBarTop">
			<ul class="social">
				<li><a href="doodle.html"><img src="imgs/facebook_logo.png" /></a></li>
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
					<li class="active"><a href="contact.php">contact</a></li>
					<li><a href="signup.php">sign up</a></li>
					
					<?php if(isset($_SESSION['userid'])){ ?>
						<li class="logout" id="navlogin"><a href="logout.php">log out</a></li>
					<?php }else{ ?>
						<li id="navlogin"><a href="login.php">log in</a></li>
					<?php } ?>
				</ul>
			</div>
		</div>
		
	</div>
	
	
	
	
	
	
	
	
	<?php include 'footer.php'; ?>