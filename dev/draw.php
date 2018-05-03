<?php

session_start();


// https://hybridauth.github.io/hybridauth/userguide/login.php.txt
// https://hybridauth.github.io/hybridauth/userguide/Configuration.html
// https://github.com/hybridauth/hybridauth


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
	$userID = $_SESSION['userid'];
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
	header('Location: draw.php');
} 




$gloveID = $_GET['id'];


?> 

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

  
    <title>Draw Lost Gloves</title>
	
	
	<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500" rel="stylesheet">

    <link rel="stylesheet" href="css/lostgloves-draw-styles.css">
	<link rel="stylesheet" type="text/css" href="css/spectrum.css">
	<link rel="stylesheet" type="text/css" href="css/range.css">
	<link rel="stylesheet" type="text/css" href="css/zocial.css">
	
	<script src="js/libs/jquery-1.11.3.min.js"></script>
    <script src='js/libs/velocity.js'></script>
    <script src='js/libs/velocity.ui.js'></script>
	<!-- colour picker -->
    <script src='js/libs/spectrum.js'></script>
	<!-- spinner -->
	<script src="js/libs/spin.min.js"></script>
	<script src="js/libs/spin_settings.js"></script>
	<!-- drawing -->
	<script src='js/libs/fabric.min.js'></script>
	
  </head>
  <body>
    
	
	
	
	
	<div class="shortHeader">
		
		<div class="shortHeaderWrapper">
			
			<div class="shortMenu">
				<ul class="nav-justified">
					<li><a href="index.php">home</a></li>
					<li><a href="gloves.php">gloves</a></li>
					<li class="active"><a href="draw.php">draw</a></li>
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
	
	
	
	<?php 
		
		// if logged in and glove ID exists show drawing - add glove bg image
		
		///if(isLoggedIn() && isset($_GET['id']) && !empty($_GET['id'])){
		if(isset($_GET['id']) && !empty($_GET['id'])){
		
			// all set to draw 
			
			?>
			
			
			<div class="drawWrapper">
	
				<div class="drawBox">
				
				
				
					<!-- TEXT SLIDERS -->
				
					<div id="lineheight-container" class="rSlider">
						<div class="size-left"><p>1<p></div>
						<div class="range-container"><span class="range-info">1</span><input type="range" value="1" min="1" max="10" id="lineheight" class="range-obj"></div>
						<div class="size-right"><p>10<p></div>
					</div>
					
					<div id="strokewidth-container" class="rSlider">
						<div class="size-left"><p>0<p></div>
						<div class="range-container"><span class="range-info">0</span><input type="range" value="0" min="0" max="20" id="strokewidth" class="range-obj"></div>
						<div class="size-right"><p>20<p></div>
					</div>
					
					<div id="fontsize-container" class="rSlider">
						<div class="size-left"><p>10<p></div>
						<div class="range-container"><span class="range-info">40</span><input type="range" value="40" min="10" max="300" id="fontsize" class="range-obj"></div>
						<div class="size-right"><p>300<p></div>
					</div>
					
					
					
					<!-- DRAW SLIDERS -->
					
					<div id="size-container" class="rSlider">
						<div class="size-left"><p>1<p></div>
						<div class="range-container"><span class="range-info">5</span><input type="range" value="5" min="1" max="80" id="drawing-line-width" class="range-obj"></div>
						<div class="size-right"><p>80<p></div>
					</div>
					
					
					<div id="arrangeMenu">
						<div class="menuLabel"><p>arrange</p></div>
						<div id="framesMenuBtns">
							<div class="frameBtnRed" onclick="arrange('clearall')" id="edit-clear"><p>clear<br>all</p></div>
							<div class="frameBtnShort" onclick="arrange('delete')" id="edit-del"><p>cut</p></div>
							<div class="frameBtn" onclick="arrange('back')" id="edit-tb"><p>to<br>back</p></div>
							<div class="frameBtn" onclick="arrange('front')" id="edit-tf"><p>to<br>front</p></div>
							<div class="frameBtn" onclick="arrange('moveback')" id="edit-mb"><p>move<br>back</p></div>
							<div class="frameBtn" onclick="arrange('movefront')" id="edit-mf"><p>move<br>front</p></div>
							
						</div>
					</div>
					
					<div id="designOjectsMenu">
						<div class="menuLabel"><p>tools</p></div>
						<div id="framesMenuBtns">
							<div class="desBtn" onclick="toggleDesignObjects('dr')" id="drbtn">draw</div>
							<div class="desBtn" onclick="toggleDesignObjects('te')" id="tebtn">text</div>
							<div class="desBtn" onclick="toggleDesignObjects('st')" id="stbtn">stickers</div>
							<div class="desBtn" onclick="toggleDesignObjects('ca')" id="cabtn">captions</div>
							<div class="desBtn" onclick="toggleDesignObjects('ey')" id="eybtn">eyes</div>
							<div class="desBtn" onclick="toggleDesignObjects('mo')" id="mobtn">mouths</div>
						</div> 
					</div> 
					
					<div id="saveMenu">
						<div class="saveBtn" onclick="saveDrawing()" id="savebtn">done</div>
					</div> 
					
					
					<!-- font picker  -->
					<div id="font-picker">
					
						<div class="fontpick fnt_againstmyself" id="ag" onclick="selectFont('AgainstMyself','fnt_againstmyself')">Against Myself</div>
						<div class="fontpick fnt_akashi" id="ak" onclick="selectFont('Akashi','fnt_akashi')">Akashi</div>
						<div class="fontpick fnt_anime_inept" id="an" onclick="selectFont('Anime Inept','fnt_anime_inept')">Anime Inept</div>
						<div class="fontpick fnt_arial" id="ar" onclick="selectFont('Arial','fnt_arial')">Arial</div>
						<div class="fontpick fnt_avenir" id="av" onclick="selectFont('Avenir','fnt_avenir')">Avenir</div>
						<div class="fontpick fnt_beltwayprophecy" id="be" onclick="selectFont('beltwayprophecy','fnt_beltwayprophecy')">Beltway Prophecy</div>
						<div class="fontpick fnt_bradley_hand" id="br" onclick="selectFont('Bradley Hand','fnt_bradley_hand')">Bradley Hand</div>
						<div class="fontpick fnt_bristol" id="bs" onclick="selectFont('Bristol','fnt_bristol')">Bristol</div>
						<div class="fontpick fnt_chalkboard_se" id="ch" onclick="selectFont('Chalkboard SE','fnt_chalkboard_se')">Chalkboard</div>
						<div class="fontpick fnt_comiccover" id="cc" onclick="selectFont('Comic Cover','fnt_comiccover')">Comic Cover</div>
						<div class="fontpick fnt_cwisdom" id="cw" onclick="selectFont('cwisdom','fnt_cwisdom')">Conventional Wisdom</div>
						<div class="fontpick fnt_courier" id="co" onclick="selectFont('Courier','fnt_courier')">Courier</div>
						<div class="fontpick fnt_degrassi" id="de" onclick="selectFont('degrassi','fnt_degrassi')">Degrassi</div>
						<div class="fontpick fnt_didot" id="di" onclick="selectFont('Didot','fnt_didot')">Didot</div>
						<div class="fontpick fnt_edosz" id="ed" onclick="selectFont('edosz','fnt_edosz')">Edo SZ</div>
						<div class="fontpick fnt_fdonkulous" id="fd" onclick="selectFont('fdonkulous','fnt_fdonkulous')">F'Donkulous</div>
						<div class="fontpick fnt_futura" id="fu" onclick="selectFont('Futura','fnt_futura')">Futura</div>
						<div class="fontpick fnt_gagalin" id="ga" onclick="selectFont('gagalin','fnt_gagalin')">Gagalin</div>
						<div class="fontpick fnt_gill_sans" id="gi" onclick="selectFont('Gill Sans','fnt_gill_sans')">Gill Sans</div>
						<div class="fontpick fnt_hawkeye" id="ha" onclick="selectFont('hawkeye','fnt_hawkeye')">Hawkeye</div>
						<div class="fontpick fnt_helvetica_neue" id="he" onclick="selectFont('Helvetica Neue','fnt_helvetica_neue')">Helvetica Neue</div>
						<div class="fontpick fnt_marion" id="ma" onclick="selectFont('Marion','fnt_marion')">Marion</div>
						<div class="fontpick fnt_marker_felt" id="mf" onclick="selectFont('Marker Felt','fnt_marker_felt')">Marker Felt</div>
						<div class="fontpick fnt_mostwasted" id="mo" onclick="selectFont('Mostwasted','fnt_mostwasted')">Most Wasted</div>
						<div class="fontpick fnt_munro" id="mu" onclick="selectFont('Munro','fnt_munro')">Munro</div>
						<div class="fontpick fnt_noteworthy" id="no" onclick="selectFont('Noteworthy','fnt_noteworthy')">Noteworthy</div>
						<div class="fontpick fnt_overdrivesunset" id="od" onclick="selectFont('OverdriveSunset','fnt_overdrivesunset')">Overdrive Sunset</div>
						<div class="fontpick fnt_papyrus" id="pa" onclick="selectFont('Papyrus','fnt_papyrus')">Papyrus</div>
							<div class="fontpick fnt_planetbenson" id="pl" onclick="selectFont('planetbenson','fnt_planetbenson')">Planet Benson</div>
							<div class="fontpick fnt_punkkid" id="pu" onclick="selectFont('punkkid','fnt_punkkid')">Punk Kid</div>
							<div class="fontpick fnt_raiderz" id="ra" onclick="selectFont('Raiderz','fnt_raiderz')">Raiderz</div>
							<div class="fontpick fnt_resurgence" id="rs" onclick="selectFont('resurgence','fnt_resurgence')">Resurgence</div>
						<div class="fontpick fnt_san_francisco" id="sa" onclick="selectFont('San Francisco','fnt_san_francisco')">San Francisco</div>
							<div class="fontpick fnt_scandal" id="sc" onclick="selectFont('scandal','fnt_scandal')">Scandal</div>
						<div class="fontpick fnt_sharkparty" id="sh" onclick="selectFont('Shark Party','fnt_sharkparty')">Shark Party</div>
							<div class="fontpick fnt_sprayme" id="sp" onclick="selectFont('sprayme','fnt_sprayme')">Spray ME</div>
							<div class="fontpick fnt_thebattlecont" id="tb" onclick="selectFont('TheBattleCont','fnt_thebattlecont')">The Battle Continues</div>
						<div class="fontpick fnt_thonburi" id="th" onclick="selectFont('Thonburi','fnt_thonburi')">Thonburi</div>
						<div class="fontpick fnt_times_new_roman" id="ti" onclick="selectFont('Times New Roman','fnt_times_new_roman')">Times New Roman</div>
							<div class="fontpick fnt_transuranium" id="tr" onclick="selectFont('transuranium','fnt_transuranium')">Transuranium</div>
							<div class="fontpick fnt_tricktag" id="tt" onclick="selectFont('TrickTag','fnt_tricktag')">TrickTag</div>
							<div class="fontpick fnt_urban_slick" id="us" onclick="selectFont('Urban_slick','fnt_urban_slick')">Urban Slick</div>
						<div class="fontpick fnt_verdana" id="ve" onclick="selectFont('Verdana','fnt_verdana')">Verdana</div>
						<div class="fontpick fnt_vtc" id="vt" onclick="selectFont('vtc','fnt_vtc')">VTC Pro</div>
						<div class="fontpick fnt_vcr_osd" id="vc" onclick="selectFont('VCR_OSD','fnt_vcr_osd')">VCR OSD Mono</div>
						<div class="fontpick fnt_zapfino" id="za" onclick="selectFont('Zapfino','fnt_zapfino')">Zapfino</div>
					</div>
					
					
					
					
					
					
															<!-- TOOLS MENUS -->
					
					
					<!-- TEXT -->
					<div id="toolsTextMenu">
						<div class="menuLabel"><p>text</p></div>
						
						<div class="text-area-container">
							<textarea placeholder="Enter text" class="draw-text" id="doodtext"></textarea>
						</div>
					
						<div id="toolsMenuBtnsText">
						
							<div class="frameBtnLongRed" onclick="textTools('deleteText')">clear text</div>
							
							<div class="frameBtnLongGreen" onclick="textTools('add')"><p>add text</p></div>
							
							<div class="frameBtnLong" onclick="textTools('fontfamily')" id="text-family"><p>select font</p></div>
							
							<div class="frameBtnLong" onclick="textTools('size')" id="text-size"><p>font size</p></div>
							
							<div class="toolsBtn" onclick="textTools('bold')" id="text-bold"><p>B</p></div>
							<div class="toolsBtn" onclick="textTools('italic')" id="text-italic"><p><i>I</i></p></div>
							<div class="toolsBtn" onclick="textTools('underline')" id="text-underline"><p><u>U</u></p></div>
							<div class="toolsBtn" onclick="textTools('alignleft')" id="text-left"><p>L</p></div>
							<div class="toolsBtn" onclick="textTools('aligncentre')" id="text-center"><p>C</p></div>
							<div class="toolsBtn" onclick="textTools('alignright')" id="text-right"><p>R</p></div>
							<div class="frameBtnLong" onclick="textTools('colour')" id="fontColBtn"><p>&nbsp;&nbsp;&nbsp;&nbsp;colour</p><input type="text" value="#FFF" id="font-color"></div>
							
							<div class="frameBtnLong" onclick="textTools('line')" id="text-height"><p>line height</p></div>
							<div class="frameBtnLong" onclick="textTools('strokew')" id="text-stroke"><p>stroke width</p></div>
							<div class="frameBtnLong" onclick="textTools('strokecol')" id="strokeColBtn"><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; s/colour</p><input type="text" value="#FFF" id="stroke-color"></div>
							
						</div>
					</div>
					
					
					<!-- DRAW -->
					<div id="toolsDrawMenu">
						<div class="menuLabel"><p>draw</p></div>
						
						<div id="toolsMenuBtnsDraw">
							<div class="frameBtnShort" onclick="drawTools('undo')" id="drawing-undo"><p>undo</p></div>
							<div class="frameBtnShort" onclick="drawTools('redo')" id="drawing-redo"><p>redo</p></div>
							<div class="frameBtnLong" onclick="drawTools('size')" id="drawing-size"><p>pen size</p></div>
							<div class="frameBtnLong" onclick="drawTools('col')" id="drawColBtn"><p>&nbsp;&nbsp;&nbsp;&nbsp;colour</p><input type="text" value="#FFF" id="drawing-color"></div>
						</div>
					</div>
					
					
					<!-- lists added dynamically using JS -->
					<div class="desObjectsWrapper">
						<div id="desObjs">
					
							<div class='desBg'>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>
								<div class='desObjPicker' onclick='selectDesignObj(\"bg001\")'><img class='desObjImg' src='imgs/test-comic.png' /></div>

							</div>
						
						</div>
					</div>
					
					<div id="designerCanvasWrapper">
						<canvas id="canvas" width="750" height="750" style="z-index:2;"></canvas>
					</div>
					
					<div id="gloveCanvasWrapper">
						<canvas id="gloveCanvas" width="750" height="750" style="z-index:1;"></canvas>
					</div>
					
				</div>
					
				</div>
			</div>
			
		<?php
		
		}else if(isset($_GET['id']) && !empty($_GET['id'])){
		
			// not logged in
			
			echo "NOT LOGGED IN";
			
			?>
			
			<div class="drawLoginWrapper">
	
				<div class="drawLogin">
					
					<div class="drawLoginHdr"><p>Please log in.</p></div>
					
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
						
					</div>
					
					<div class="socialForm">
						
						<div class="drawSocialHdr"><p>Or</p></div>
						
						<div class="socialBtn"><a href="logmein.php@provider=facebook" class="zocial facebook">sign in with Facebook</a></div>
						<div class="socialBtn"><a href="logmein.php@provider=google" class="zocial googleplus">sign in with Google+</a></div>
						<div class="socialBtn"><a href="logmein.php@provider=twitter" class="zocial twitter">sign in with Twitter</a></div>
					</div>
					
				</div>
				
			</div>
			
		<?php
		
		
		}else if(!isset($_GET['id']) || empty($_GET['id'])){
		
			// no glove ID
			
			echo "NO GLOVE ID";
			
			?>
			
			<div class="gloveWarnWrapper">
	
				<div class="drawLogin">
					
					<div class="drawLoginHdr"><p>You haven't selected a glove to use.</p></div>
					
					<div class="socialForm">
						
						<div class="selGloveBtn"><a href="gloves.php">select a glove</a></div>

					</div>
					
				</div>
				
			</div>
			
		<?php	
			
		}
		
	
		//echo '$loggedin = ' . isLoggedIn() . '     $gloveID = '. $_GET['id']
	
	
	
	?>
	
	
	<?php include 'footer.php'; ?>
	
	
	
	<!--  -->
	
	
	<script src='js/realcomics_drawing_data.js'></script> 
	<script src='js/realcomics_drawing_text.js'></script> 
	<script src='js/realcomics_drawing_history.js'></script> 
	<script src='js/realcomics_drawing_frames.js'></script> 
	<script src='js/realcomics_mycomics.js'></script> 
	<script src='js/realcomics_drawing.js'></script> 
	<script src='js/realcomics_drawing_utils.js'></script> 
	<script src='js/realcomics_drawing_publish.js'></script> 
	
	<script src='js/realcomics_init.js'></script> 
	
	
	
	
	<script>
        $('#drawing-color').spectrum({
            color: '#fff',
            showAlpha: true,
            showPalette: true,
            showSelectionPalette: true,
            showPaletteOnly: false,
			togglePaletteOnly: false,
			palette: [
				["#000","#222","#444","#666","#999","#aaa","#ccc","#fff"],
				["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
			],
            preferredFormat: "rgb",
            change: function(color){
                $('drawing-color').val(color);
            },
            move: function(color){
                $('drawing-color').val(color);
            },
			show: function(color){
				drawColPickShowing = true;
				$('#drawColBtn').css('background','white');
				$('#drawColBtn').css('color','black');
				checkSlidersClosed();
            },
			hide: function(color){
				drawColPickShowing = false;
				$('#drawColBtn').css('background','#d63f2b');
				$('#drawColBtn').css('color','#fff');
            },
            clickoutFiresChange: false,
			/*localStorageKey: "lostgloves",*/
			hideAfterPaletteSelect:false,
			maxSelectionSize: 8
        });
		$('#font-color').spectrum({
            color: '#000',
            showAlpha: true,
            showPalette: true,
            showSelectionPalette: true,
            showPaletteOnly: false,
			togglePaletteOnly: false,
			palette: [
				["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
				["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
			],
            preferredFormat: "rgb",
            change: function(color){
                $('font-color').val(color);
            },
            move: function(color){
                $('font-color').val(color);
            },
			show: function(color){
				fontColPickShowing = true;
				$('#fontColBtn').css('background','white');
				$('#fontColBtn').css('color','black');
				checkSlidersClosed();
            },
			hide: function(color){
				fontColPickShowing = false;
				$('#fontColBtn').css('background','#d63f2b');
				$('#fontColBtn').css('color','#fff');
            },
            clickoutFiresChange: true,
			/*localStorageKey: "lostgloves",*/
			hideAfterPaletteSelect:false,
			maxSelectionSize: 8
        });
		$('#stroke-color').spectrum({
            color: '#fff',
            showAlpha: true,
            showPalette: true,
            showSelectionPalette: true,
            showPaletteOnly: false,
			togglePaletteOnly: false,
			palette: [
				["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
				["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
			],
            preferredFormat: "rgb",
            change: function(color){
                $('stroke-color').val(color);
            },
            move: function(color){
                $('stroke-color').val(color);
            },
			show: function(color){
				strokeColPickShowing = true;
				$('#strokeColBtn').css('background','white');
				$('#strokeColBtn').css('color','black');
				checkSlidersClosed();
            },
			hide: function(color){
				strokeColPickShowing = false;
				$('#strokeColBtn').css('background','#d63f2b');
				$('#strokeColBtn').css('color','#fff');
            },
            clickoutFiresChange: true,
			/*localStorageKey: "lostgloves",*/
			hideAfterPaletteSelect:false,
			maxSelectionSize: 8
        });
		
		$(document).ready(function(){
			// initDrawing();
		});
		
		
    </script>
	
	<?php 
		
		// if logged in and glove ID exists add glove bg image
		
		if(isset($_GET['id']) && !empty($_GET['id'])){
		
			?>
			
			<script>
				var id = <?php echo $gloveID ?>;
				
				//initDrawing(id);
			</script>
			
		<?php	
		}
	?>
	
  </body>
</html>