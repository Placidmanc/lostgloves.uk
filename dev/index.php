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
					<li class="active"><a href="index.php">home</a></li>
					<li><a href="gloves.php">gloves</a></li>
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
	
	
	
	
	<div class="images">
		
		<div class="imagesBox">
		
			<ul id="rig">
				<li>
					<div class="imageHolder">
					
						<div class="caption-box">	
							<div class="caption">
								<p class="captiontitle">LOVERS IN PARIS</p>
								<p class="captionartist">placidmanc</p>
								<p class="captionlikes">51 likes</p>
								<div class="likeBtn"><img src="imgs/heart.png" class="likeHeart" /></div>
							</div>
						</div>
					
						<img src="imgs/glove15-overlay01.png" class="gloveImgOverlay" />
						<img src="imgs/glove15.jpg" class="gloveImg" />
					</div>
				</li>
				
				<li>
					<div class="imageHolder">
						
						<div class="caption-box">	
							<div class="caption">
								<p class="captiontitle">LOVERS IN PARIS</p>
								<p class="captionartist">placidmanc</p>
								<p class="captionlikes">51 likes</p>
								<div class="likeBtn"><img src="imgs/heart.png" class="likeHeart" /></div>
							</div>
						</div>
						
						<img src="imgs/glove15-overlay01.png" class="gloveImgOverlay" />
						<img src="imgs/glove15.jpg" class="gloveImg" />
					</div>
				</li>
				
				<li>
					<div class="imageHolder">
						<div class="caption-box">	
							<div class="caption">
								<p class="captiontitle">LOVERS IN PARIS</p>
								<p class="captionartist">placidmanc</p>
								<p class="captionlikes">51 likes</p>
								<div class="likeBtn"><img src="imgs/heart.png" class="likeHeart" /></div>
							</div>
						</div>
						<img src="imgs/glove15-overlay01.png" class="gloveImgOverlay" />
						<img src="imgs/glove15.jpg" class="gloveImg" />
					</div>
				</li>
				
				<li>
					<div class="imageHolder">
						<div class="caption-box">	
							<div class="caption">
								<p class="captiontitle">LOVERS IN PARIS</p>
								<p class="captionartist">placidmanc</p>
								<p class="captionlikes">51 likes</p>
								<div class="likeBtn"><img src="imgs/heart.png" class="likeHeart" /></div>
							</div>
						</div>
						<img src="imgs/glove15-overlay01.png" class="gloveImgOverlay" />
						<img src="imgs/glove15.jpg" class="gloveImg" />
					</div>
				</li>
				
				<li>
					<div class="imageHolder">
						<div class="caption-box">	
							<div class="caption">
								<p class="captiontitle">LOVERS IN PARIS</p>
								<p class="captionartist">placidmanc</p>
								<p class="captionlikes">51 likes</p>
								<div class="likeBtn"><img src="imgs/heart.png" class="likeHeart" /></div>
							</div>
						</div>
						<img src="imgs/glove15-overlay01.png" class="gloveImgOverlay" />
						<img src="imgs/glove15.jpg" class="gloveImg" />
					</div>
				</li>
				
				<li>
					<div class="imageHolder">
						<div class="caption-box">	
							<div class="caption">
								<p class="captiontitle">LOVERS IN PARIS</p>
								<p class="captionartist">placidmanc</p>
								<p class="captionlikes">51 likes</p>
								<div class="likeBtn"><img src="imgs/heart.png" class="likeHeart" /></div>
							</div>
						</div>
						<img src="imgs/glove15-overlay01.png" class="gloveImgOverlay" />
						<img src="imgs/glove15.jpg" class="gloveImg" />
					</div>
				</li>
				
				<li>
					<div class="imageHolder">
						<div class="caption-box">	
							<div class="caption">
								<p class="captiontitle">LOVERS IN PARIS</p>
								<p class="captionartist">placidmanc</p>
								<p class="captionlikes">51 likes</p>
								<div class="likeBtn"><img src="imgs/heart.png" class="likeHeart" /></div>
							</div>
						</div>
						<img src="imgs/glove15-overlay01.png" class="gloveImgOverlay" />
						<img src="imgs/glove15.jpg" class="gloveImg" />
					</div>
				</li>
				
				<li>
					<div class="imageHolder">
						<div class="caption-box">	
							<div class="caption">
								<p class="captiontitle">LOVERS IN PARIS</p>
								<p class="captionartist">placidmanc</p>
								<p class="captionlikes">51 likes</p>
								<div class="likeBtn"><img src="imgs/heart.png" class="likeHeart" /></div>
							</div>
						</div>
						<img src="imgs/glove15-overlay01.png" class="gloveImgOverlay" />
						<img src="imgs/glove15.jpg" class="gloveImg" />
					</div>
				</li>
				
				<li>
					<div class="imageHolder">
						<div class="caption-box">	
							<div class="caption">
								<p class="captiontitle">LOVERS IN PARIS</p>
								<p class="captionartist">placidmanc</p>
								<p class="captionlikes">51 likes</p>
								<div class="likeBtn"><img src="imgs/heart.png" class="likeHeart" /></div>
							</div>
						</div>
						<img src="imgs/glove15-overlay01.png" class="gloveImgOverlay" />
						<img src="imgs/glove15.jpg" class="gloveImg" />
					</div>
				</li>
				
				<li>
					<div class="imageHolder">
						<div class="caption-box">	
							<div class="caption">
								<p class="captiontitle">LOVERS IN PARIS</p>
								<p class="captionartist">placidmanc</p>
								<p class="captionlikes">51 likes</p>
								<div class="likeBtn"><img src="imgs/heart.png" class="likeHeart" /></div>
							</div>
						</div>
						<img src="imgs/glove15-overlay01.png" class="gloveImgOverlay" />
						<img src="imgs/glove15.jpg" class="gloveImg" />
					</div>
				</li>
				
			</ul>
			
		</div>
	
	</div>
	
	
	
	
	<div class="newsletter">
		
		<form class="nlForm">
			
			<div class="nlEmail"><input type="email" placeholder="Enter your email address"></div>
			<div class="nlSubmit">send me news</div>
			<div class="nlcta">WE WILL SEND YOU OCCASIONAL NEWS ABOUT LOST GLOVES</div>
		</form>
		
	</div>
	
	<script>
	
		/* $(document).ready(function(){
			
		}); */
	
		
	
	</script>
	
	
	
	<?php include 'footer.php'; ?>