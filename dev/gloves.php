<?php

session_start();


?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

  
    <title>Lost Gloves</title>
	
	
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
					<li class="active"><a href="gloves.php">gloves</a></li>
					<li><a href="draw.php">draw</a></li>
					<li><a href="about.php">about</a></li>
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
	
	
	
	<div class="glovesCTA">
		
		<div class="glovesCTAWrapper">
			<p>Here is a collection of photographs of <span style="font-weight: 500;">Lost Gloves</span>.</p> 

			<p>Some have found resting places on fences, benches and trees; set there by a caring stranger.</p> 

			<p>Others lie where they were first lost, separated from their opposite number and loving owner.</p>

			<p>Some gloves have been found in pairs. Does the owner feel less about losing a pair, than just a single glove?</p>  

			<p>Look carefully at each glove. Does it remind you of something? A face, or an animal perhaps?</p> 

			<p>If you can see what others can’t, you are possibly experiencing the psychological phenomenon known as <span style="font-weight: 500;">Pareidolia</span>.</p> 

			<p>Don’t worry, it’s quite common, particularly in artists and creative people.</p> 

			<p>Most people see shapes in clouds, or faces on the front of cars. It’s all just <span style="font-weight: 500;">Pareidolia</span>.</p>

			<p>If you see a shape on a glove, can you draw it for others to see it too?</p> 
			
			<p>It doesn’t have to be a work of art, just a quick doodle will do. We’ve even provided some graphics to help you get started.</p>

			<p>Each <span style="font-weight: 500;">Lost Glove</span> has its own story, whether it was reunited with its owner, or lost forever.</p>

			<p>Can you continue the story of each <span style="font-weight: 500;">Lost Glove</span>?</p>  
		</div>
		
	</div>
	
	
	
	<div class="gloves">
		
		<div class="glovesBox">
		
			<ul id="rig">
				<li><a href="draw.php?id=1"><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove01.jpg" class="glovesImg" /></div></a></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove02.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove03.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove04.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove05.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove08.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove09.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove11.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove12.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove13.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove14.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove15.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove17.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove18.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove19.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove21.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove22.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove23.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove24.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove25.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove28.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove30.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove31.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove32.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove33.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove34.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove35.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove37.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove38.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove39.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove40.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove41.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove42.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove43.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove44.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove45.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove46.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove47.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove48.jpg" class="glovesImg" /></div></li>
				
				
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove51.jpg" class="glovesImg" /></div></li>
				
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove53.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove54.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove55.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove56.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove57.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove58.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove59.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove60.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove61.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove62.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove63.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove64.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove65.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove66.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove67.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove68.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove69.jpg" class="glovesImg" /></div></li>
				<li><div class="glovesHolder"><img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="imgs/gloves/glove70.jpg" class="glovesImg" /></div></li>
				
			</ul>	

			
			
		</div>
	
	</div>
	
	
	<div class="newsletter">
		
		<form class="nlForm">
			
			<div class="nlEmail"><input type="email" placeholder="Enter your email address"></div>
			<div class="nlSubmit">SEND ME NEWS</div>
			<div class="nlcta">WE WILL SEND YOU OCCASIONAL NEWS ABOUT LOST GLOVES</div>
		</form>
		
	</div>
	
	<script>
		function init() {
			var imgDefer = document.getElementsByClassName('glovesImg');
			for (var i=0; i<imgDefer.length; i++) {
				if(imgDefer[i].getAttribute('data-src')){
					imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
				} 
			}
		}
		window.onload = init;
	</script>
	
	
	<?php include 'footer.php'; ?>