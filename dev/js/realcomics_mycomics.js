
var getTrackableFromDB = false;



// called after DB init 
function getMyComicsData() 
{
	//debug("getMyComicsData  " );
	
	showWebSpinner();
	
	// reset array
	comicArr = [];
	
	var transaction = realTagrDB.transaction(["realTagrDB"],"readonly").objectStore("realTagrDB");
	
	// make sure there are records
	var count = transaction.count();
	count.onsuccess = function() {
		//debug("COUNT " + count.result);
		if(count.result < 1){
			//debug("getMyComicsData  NO RECORDS ");
			var htmlStr = "<div class='nomycomicrecords'><p>YOU HAVE NOT CREATED ANY TAGS</p><div class='newComicBtn' onclick='showScreen(\"newcomic\")'>CREATE A NEW TAG</div></div>";
			$('#mycomicsListWrapper').html(htmlStr);
			hideWebSpinner();
		}else{
			// there are comics - display them
			loadAndDisplayMyComics();
		}
	}
};


function loadAndDisplayMyComics()
{	
	//debug("loadAndDisplayMyComics ");
	
	var transaction = realTagrDB.transaction(["realTagrDB"],"readonly").objectStore("realTagrDB");
	var req = transaction.openCursor();
	
	var htmlStr = "<ul class='comiclist'>";
	
	req.onsuccess = function(event) {
		
		//debug("getMyComicsData  onsuccess " );
		
		var cursor = event.target.result;
		if (cursor) {
			
			//debug("ID > " + cursor.value.id + " title > " + cursor.value.comicName + " frames > " + cursor.value.comicFrames.length);
			
			var title = cursor.value.comicName;
			var state = cursor.value.comicState == "published" ? "published" : "";
			var comicID = cursor.value.id;
			var arEn = cursor.value.arEnabled;
			
			// store basic comic info
			var framesArr = [];
			var comicObj = {comicID:comicID,comicName:title,comicFrames:framesArr,comicState:state,arEnabled:arEn};
			comicArr.push(comicObj);
			
			
			// info
			htmlStr += "<li><div class='comicItem'>";
			
			if(arEn){
				htmlStr += "<div class='comicInfo'><div class='comicItemTitle'>" + title + "<br><span class='comicItemState'>" + state + "</span></div><img src='imgs/ar-enabled.png' class='myComicAROn' /></div>";
			}else{
				htmlStr += "<div class='comicInfo'><div class='comicItemTitle'>" + title + "<br><span class='comicItemState'>" + state + "</span></div>";
			}
			
			
			// frames
			htmlStr += "<div class='comicFrames'>";	

			var	noFrames = false;		
				
			if(cursor.value.comicFrames.length != 0){	
				
				for(var i=0; i<cursor.value.comicFrames.length; i++){ 
					
					var track = cursor.value.comicFrames[i].frameTrigger;
					var des = cursor.value.comicFrames[i].frameDesign;
					
					var design = new Image();
					design.src = des;
					
					var trackable = new Image();
					trackable.src = track;
					
					htmlStr += "<div class='cframe'><div class='frameDes'><img class='frameDesImg' src='" + design.src + "'></div><div class='frameBG'><img class='frameDesImg' src='" + trackable.src + "'></div></div>";
				}
				
				
				// add ADD FRAME if space
				if(cursor.value.comicFrames.length < 12 && state != "published"){
					htmlStr += "<div class='cframe'><div class='cframeAddWrapper'><div class='cframeAdd' onclick='myComicActions(\"addto\"," + comicID + ")'>";
					htmlStr += "<div class='addCircle'>+</div>";
					htmlStr += "<div class='addText'>ADD FRAME</div>";
					htmlStr += "</div></div></div>";
				}
				
			}else{
				
				// add frames button
				htmlStr += "<div class='cframe'><div class='cframeAddWrapper'><div class='cframeAdd' onclick='myComicActions(\"addto\"," + comicID + ")'>";
				htmlStr += "<div class='addCircle'>+</div>";
				htmlStr += "<div class='addText'>ADD FRAME</div>";
				htmlStr += "</div></div></div>";
				
				noFrames = true;
			}
			htmlStr += "</div>";
				
				
			// buttons
			htmlStr += "<div class='comicButtons'>";
			
				
			if(!noFrames){ 
				htmlStr += "<div class='comicBtnLongRed' ontouchstart='return true;' ontouchend='myComicActions(\"delete\"," + comicID + ")'><p>DELETE TAG</p></div>";
				if(state != "published"){
					htmlStr += "<div class='comicBtnLong' ontouchstart='return true;' ontouchend='myComicActions(\"publish\"," + comicID + ")'><p>PUBLISH TAG</p></div>";
					htmlStr += "<div class='comicBtnLong' ontouchstart='return true;' ontouchend='myComicActions(\"edit\"," + comicID + ")'><p>EDIT TAG</p></div>";
				}
				htmlStr += "<div class='comicBtnLong' ontouchstart='return true;' ontouchend='myComicActions(\"view\"," + comicID + ")'><p>VIEW TAG</p></div>";
			}else{
				htmlStr += "<div class='comicBtnLongRed' ontouchstart='return true;' ontouchend='myComicActions(\"delete\"," + comicID + ")'><p>DELETE TAG</p></div>";
			}
			
			htmlStr += "</div></div></li>";
			
			
			cursor.continue();
		
		}else{
			
			// finish and display list 
			htmlStr += "</ul>";
			
			$('#mycomicsListWrapper').html(htmlStr);
			
			hideWebSpinner();
			
			
			// hide or show New Comic button on My Comic screen if less than max
			if(comicArr.length < maxComics){
				$('#newcomicbtn').show();
			}else{
				$('#newcomicbtn').hide();
			}
			
			userComicsCount = comicArr.length;
			
			//debug("getMyComicsData COMPLETE  userComicsCount > " + userComicsCount );
			
		}
	}; 
	req.onerror = function (e) {
		//debug("Error Getting: " + e);
	};  
};



function myComicActions(act, num)
{
	debug("myComicActions act > " + act + " id  > " + num);
	
	localStorage.realComicAction = "";
	
	if(act == 'delete'){
		
		showDeletePop(num);
		
	}else if(act == 'publish'){
		
		$('#myComicsScreen').hide();
		
		showPublishScreen(num);
		
	}else if(act == 'edit'){
		
		closeBackTo = "mycomics";
		$('#myComicsScreen').hide();
		selectedComicID = num;
		
		viewAllFrames(false);
		
	}else if(act == 'view'){
		
		// open viewing and load user comic as selected
		
		$('#myComicsScreen').hide();
		
		localStorage.realComicID = num;
		localStorage.realComicAction = "viewComic";
		
		// this will be replaced by different function
		returnToHome();
		
		
		
	}else if(act == 'addto'){
		
		$('#myComicsScreen').hide();
		
		closeBackTo = "mycomics";
		
		//continueAddingFrames
		getComicData(num);
	}
};


function showDeletePop(id)
{
	// set comic ID so delete can continue	
	selectedComicID = id;
	
	// show pop up
	$('#deleteComicPopupscreen').velocity("fadeIn", {duration: screenFade });
	deletePopShowing = true;
};


function deleteComic()
{

	deletePopShowing = false;
	$('#deleteComicPopupscreen').velocity("fadeOut", {duration: screenFade });
	
	// find comic in DB and delete - then reload all data to reset arrays
	deleteComicFromDB();
};


function deleteComicFromDB() 
{
	//debug("deleteComicFromDB " );
	
	var request = realTagrDB.transaction(["realTagrDB"], "readwrite").objectStore("realTagrDB").delete(Number(selectedComicID));
	
	request.onsuccess = function(event) {
		
		// reload DB and display mycomics
		$('#mycomicsListWrapper').html("");
		
		getMyComicsData();
	};
};


// called from My Comics screen HTML button - if max comics hasn't been reached
function myComicsNewComic()
{
	cleanUptrackingCanvas();
	
	showScreen('newcomic');
	
	$('#myComicsScreen').hide();
	$('#newComicCancel').show();
};


// called from comicStartScreen HTML button
function backToMyComics()
{
	document.activeElement.blur();
	
	$('#framesScreen').hide();
	$('#frameObjs').hide();
	$('#comicStartScreen').hide();
	
	showScreen('mycomics');

	getMyComicsData();
};


// called from captureScreen HTML button
function cancelCapture()
{
	// new comic - don't show button
	
	// adding frames - back to new frame
	
	backToNewFrame();
}


// called from myComicActions 'addTo' to add frames to comic
function getComicData(ap) 
{
	//debug("getComicData  > ap " + ap);
	
	var transaction = realTagrDB.transaction(["realTagrDB"]);
	var objectStore = transaction.objectStore("realTagrDB");
	var request = objectStore.get(ap);

	request.onsuccess = function(event) {
		
		if(request.result) {
			
			//debug("DB comicName: " + request.result.comicName );
			//debug("DB comicFrames: " + request.result.comicFrames.length );
			
			isAREnabled = request.result.arEnabled;
			
			//debug("DB isAREnabled: " + isAREnabled );
			
			// hide add new button if AR enabled
			/* if(isAREnabled){
				$('#addnewbtn').css('opacity',.2);
			}else{
				$('#addnewbtn').css('opacity',1);
			} */
			
			$('#addnewbtn').css('opacity',1);
			
			
			selectedComicID = request.result.id;
			
			//debug("DB selectedComicID: " + selectedComicID );
			
			currentFrame = request.result.comicFrames.length + 1;
			
			//debug("DB frames: " + request.result.comicFrames.length );
			
			// hide copy existing trackable if doesn't exist
			if(request.result.comicFrames.length > 0){
				$('#nfCopy').show();
				
				// set flag to allow DB search
				getTrackableFromDB = true;
			}else{
				$('#nfCopy').hide();
				getTrackableFromDB = false;
			}
			
			//debug("DB getTrackableFromDB: " + getTrackableFromDB )
			
			getHighestTrackableNum('fromMyComics');
		
		} else {
			//debug(" couldn't be found in your database!");
		}
	};
	request.onerror = function(event) {
		//debug("Unable to retrieve data from database!");
	};
};


function setFrameMarker()
{
	//debug("setFrameMarker  currentFrame = " + currentFrame);
	
	// update display with frame number
	var str = currentFrame + "/" + maxFrames;
	$('#frameMarker').html(str);
	
	if(currentFrame == 1){
		$('#viewallbtn').css('opacity',.2);
	}else{
		$('#viewallbtn').css('opacity',1);
	}
	
	if(currentFrame == maxFrames){
		$('#addnewbtn').css('opacity',.2);
		$('#makecopybtn').css('opacity',.2);
	}else{
		$('#addnewbtn').css('opacity',1);
		$('#makecopybtn').css('opacity',1);
	}
};









