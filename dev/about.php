<?php

session_start();


?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

  
    <title>About Lost Gloves</title>
	
	
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
					<li class="active"><a href="about.php">about</a></li>
					<li><a href="contact.php">contact</a></li>
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
	
	
	
	
	<div class="about">
		
		<div class="aboutBox">
			
			<p><strong>Lost Gloves</strong> is a collection of photographs taken over the last four years or so. The first lost glove was spotted and photographed was in February 2013, and there have been well over 100 gloves found since.</p>
			
			<p>When I saw the first glove, it wasn't particularly significant and I walked on by, not paying too much attention. A couple of minutes later I saw a second glove, and then a couple of minutes more a third. Three gloves on one stretch of road in less than five minutes - now that's odd.</p>

			<p>I didn't think to take photographs there and then, as I was in a hurry. But on my way back, I took photo's of all three gloves (in reverse order to how they were found).</p>
			
			<p>Here are the photo's in order of being photographed.</p>
			
			<img src="imgs/2013-02-22-12.30.jpg" class="" />
			<img src="imgs/2013-02-22-12.31.jpg" class="" />
			<img src="imgs/2013-02-22-12.34.jpg" class="" />

			<p>I shared my odd day with friends and family who all concurred that it was indeed an unusual occurance.</p>

			<p>From that day on, for some unknown reason, I started photographing each lost glove I found, not knowing what to do with them.</p>

			<p>I posted a few photo's on Instagram and received nice comments, but then decided to keep the photo's to myself for something bigger and better in the future.</p>
			
			<p>About 18 months later I found a glove that looked like a face, simply because of the way it was folded.</p>
			
			<p>Have a look for yourself...</p>
			
			<img src="imgs/2014-09-14-12.45.jpg" class="" />
			
			<p>I later found out that seeing images in things is actually a psychological phenomenon called <a href="https://en.wikipedia.org/wiki/Pareidolia" target="blank">Pareidolia.</a> Maybe you've looked at a cloud and it looked like an animal - well that's Pareidolia.</p>
			
			<p>As I'm a programmer, I decided to set up this website so you can draw what you see over the image of the glove, and see what others have seen and shared.</p> 
			
			<p>I keep seeing lost gloves and can't resist the urge to photograph them. I even get emails from friends telling me of locations of lost gloves they've just spotted!</p>
			
			<p>I decided I needed to set some rules when taking photo's of lost gloves. These were to let the forces of nature be the inspiration, not me.</p>
			
			<ul>
				<li>Gloves are photographed exactly where they were found.</li>
				<li>Gloves aren’t posed or handled in any way.</li>
				<li>Gloves have genuinely been lost by a stranger to me.</li>
				<li>Gloves are left as they were found.</li>
			</ul>
			
			<p>Photographing lost gloves has become something of a personal project, so I hope I can share my inspiration and help you on your way to being creative.</p>
			
		</div>
	
	</div>
	
	
	
	
	
	<!-- <div class="newsletter">
		
		<form>
			<div class="nlcta">SIGN UP TO RECEIVE NEWS ON LOST GLOVES</div>
			<div class="nlEmail">
				<input type="email" placeholder="Your email">
				<div class="nlSubmit">SEND</div>
			</div>
			
		</form>
		
	</div>
	
	 -->
	 
	 
	 <?php include 'footer.php'; ?>
	 
	 