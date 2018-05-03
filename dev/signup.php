<?php

require_once('datacon.php');
require("validEmail.php");
require("passwordHash.php");


session_start();



$editFormAction = $_SERVER['PHP_SELF'];
if (isset($_SERVER['QUERY_STRING'])) {
	$editFormAction .= "?" . htmlentities($_SERVER['QUERY_STRING']);
}

if ((isset($_POST["MM_insert"])) && ($_POST["MM_insert"] == "signup")) {

	$errors = array();
	

	$_POST = array_map('trim', $_POST);
	
	$unam = $_POST['username'];
	$mail = $_POST['email'];
	$passa = $_POST['passa'];
	$passb = $_POST['passb'];
	$news = isset($_POST['newsletter']) ? "1" : "0";
	$legal = isset($_POST['acceptLegal']) ? "1" : "0";
	
	
	// validate the input
	if($legal == "0"){
		$errors[] = 'Please accept the terms of use to continue';
	}
	if (empty($unam)) {
		$errors[] = 'Please enter a username';
	}
	if(strlen($unam) < 3 ){
		$errors[] = 'Username must be between 3 and 30 characters < 3';
	}
	if(strlen($unam) > 30) {
		$errors[] = 'Username must be between 3 and 30 characters > 30';
	}
	
	if (empty($passa)) {
		$errors[] = 'Please enter a password';
	}else{
		if ($passa != $passb) {
			$errors[] = 'Passwords do not match';
		}
	}


	// test email
	function testEmail($email){
		$pass = validEmail($email);
		return $pass;
	}

	$emailpass = true;
	testEmail($_POST['email']);

	if(!$emailpass){
	   $errors[] = 'Please enter a valid email address';
	}

	
	if (!$errors) {

		$hasher = new PasswordHash(8, false);
		$hash = $hasher->HashPassword($passa);

		$dadd = date("Y-m-d H:i:s");
		$toke = md5(uniqid(mt_rand(), true));
		$stat = 0;

		try 
		{
			$conn = new PDO("mysql:host=$dbhost;dbname=$dbdata", $dbuser, $dbpass);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			$stmt = $conn->prepare("INSERT INTO users ( 
				UName, Email, DateAdded, Legal, Newsletter, Password, Token, Status 
			) VALUES (
				:username, :email, :dateAdded, :legal, :news, :password, :token, :status 
			);");
			$stmt->execute(array(':username' => $unam, ':email' => $mail, ':dateAdded' => $dadd, ':legal' => $legal, ':news' => $news, ':password' => $hash, ':token' => $toke, ':status' => $stat)); 
			$affected_rows = $stmt->rowCount();
		}
		catch(PDOException $e) 
		{
			$errors[] = $e->getMessage();
		}



		if ($affected_rows < 1) {
			$errors[] = 'Sorry, there was a problem with the database. Please try later.';
		} else {

			//echo "all OK";
			
			// if all OK, send an email to the user

			/*
			
			$activateLink = $server_url. '/admin/';
			
			
			$plain_text = "Dear " . $nameIn.",\n\n";
			$plain_text .= "You have been registered as an administrator for the JTI Augmented Reality app.\n\n";
			$plain_text .= "Please click on the following link or copy and paste it into your browser.\n\n";
			$plain_text .= $activateLink . "\n\n";
			$plain_text .= "Log into the account using the username and password below.\n\n";
			$plain_text .= "Your login username is\n\n";
			$plain_text .= $nameIn . "\n\n";
			$plain_text .= "Use this password to log in first time only.\n\n";
			$plain_text .= $pass . "\n\n";
			$plain_text .= "CHANGE YOUR PASSWORD immediately after your first login by clicking on your name at the top of the page.\n\n";
			

			$html_text = "<html>";
			$html_text .= "<body leftmargin='0' marginwidth='0' topmargin='0' marginheight='0' offset='0'>";
			$html_text .= "<center>";
			$html_text .= "<table border='0' cellpadding='0' cellspacing='0' height='100%' width='100%' id='backgroundTable'>";
			$html_text .= "<table border='0' cellpadding='0' cellspacing='0' width='600' id='toplogos'>";
			$html_text .= "<tr>";
			$html_text .= "<td valign='bottom' width='300'>";	
			$html_text .= "<div style='text-align: left;padding-left: 37px;'>";
			$html_text .= "<img src='" .$server_url.  "/email/squares.jpg'>";
			$html_text .= "</div>";
			$html_text .= "</td>";
			$html_text .= "<td width='223'>";
			$html_text .= "<div style='text-align: right;'>";
			$html_text .= "<img src='" .$server_url.  "/email/JTI-logo.jpg'>";
			$html_text .= "</div>";
			$html_text .= "</td>";
			$html_text .= "</tr>";
			$html_text .= "</table>";
			$html_text .= "<table border='0' cellpadding='4' cellspacing='0' width='600' height='260'>";
			$html_text .= "<tr>";
			$html_text .= "<td valign='top'>";
			$html_text .= "<div style='color: #000000;font-family: Arial;font-size: 12px;line-height: 150%;text-align: left; margin-top: 25px;padding-left: 37px;paddin-right: 40px;'>Dear " . $nameIn . "<br><br>You have been registered as an administrator for the JTI Augmented Reality app.<br><br>Please click on the following link or copy and paste it into your browser<br><br><a href='" . $activateLink . "'>" . $activateLink . "</a><br><br><span style='color: #81c9ae;'><strong>Log into the account using the username and password below.</strong></span><br><br><strong>Your login username is</strong><br>" . $nameIn . "<br><br><strong>Use this password to log in first time only</strong><br>" . $pass;
			$html_text .= "</div>";
			$html_text .= "</td>";
			$html_text .= "</tr>";
			$html_text .= "</table>";
			$html_text .= "<table border='0' cellpadding='4' cellspacing='0' width='600' height='100'>";
			$html_text .= "<tr>";
			$html_text .= "<td valign='top' align='left' width='373'>";
			$html_text .= "<div style='color: #000000;font-family: Arial;font-size: 12px;line-height: 150%;text-align: left; margin-top: 25px;margin-left: 37px;padding: 10px;width: 373px;background-image:url(\"" .$server_url.  "/email/notebox.jpg\");background-repeat: no-repeat;'><span style='color: #81c9ae;'><strong>CHANGE YOUR PASSWORD</strong></span> immediately after your first login by clicking on your name at the top of the page.";
			$html_text .= "</div>";
			$html_text .= "</td>";
			$html_text .= "</tr>";
			$html_text .= "</table>";
			$html_text .= "</table>";
			$html_text .= "</center>";
			$html_text .= "</body>";
			$html_text .= "</html>";

			$subject = "Log into your new JTI Augmented Reality admin account";


			send_email($email, WEBMASTER_EMAIL, $subject, $html_text, $plain_text);
			
			*/

		}
	}
}

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

  
    <title>Sign Up Lost Gloves</title>
	
	
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
					<li class="active"><a href="signup.php">sign up</a></li>
					
					<?php if(isset($_SESSION['userid'])){ ?>
						<li class="logout" id="navlogin"><a href="logout.php">log out</a></li>
					<?php }else{ ?>
						<li id="navlogin"><a href="login.php">log in</a></li>
					<?php } ?>
				</ul>
			</div>
		</div>
		
	</div>
	
	
	
	<div class="signUpFormHolder">
		
		<div class="signUpForm">
		
			

			<?php

				$showForm = true;

				if ($_POST && !$errors) {

					$showForm = false;

				?>
					
					<div class="loginform">
						<div class="confirmholder">
							<div class="confirm"><p>New account created</p></div>
							<div class="loginBtnHolder"><a href="index.php"><div class="loginBtn">log in</div></a></div>
						</div>
					</div>

				<?php
				}  

				if ($showForm){
				?>
			
				<div class="createform">
			 
					<form name="create" action="<?php echo $editFormAction; ?>" method="post">
						
						<div class="formfield"><input type="text" size="25" maxlength="30" name="username" class="textinput" placeholder="Enter a Username" /></div>

						<div class="formfield"><input type="text" size="25" maxlength="250" name="email" class="textinput" placeholder="Enter your Email address" /></div>
						
						<div class="formfield"><input type="password" size="25" name="passa" class="textinput" placeholder="Create a Password" /></div>
						
						<div class="formfield"><input type="password" size="25" name="passb" class="textinput" placeholder="Confirm your Password" /></div>
						
						
						<div class="formfieldCB"><input id="newsletter" name="newsletter" type="checkbox" /> Sign me up for the Lost Gloves newsletter</div>
						
						<div class="formfieldCB"><input id="acceptLegal" name="acceptLegal" type="checkbox" /> I accept the <a target="_blank" href="terms">terms of use</a> and have read the <a target="_blank" href="privacy-policy">privacy policy</a></div>
						

						<input type="hidden" name="MM_insert" value="signup" />
						
						<?php
						
							if ($_POST && $errors) {
								echo '<div class="errors"><ul id="errorlist">';
									foreach ($errors as $error) {
										echo "<li>$error</li>";
									}
								echo '</ul></div>';
							} 
						?>
					
						<div class="submitBtn"><input type="submit" name="submit" value="sign up" /></div>   

					</form>
				</div> 

				

				<?php
				}  
			?>

			</div>
		</div>
	
	
	
	
	
	
	<?php include 'footer.php'; ?>