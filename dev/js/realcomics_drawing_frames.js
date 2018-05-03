
var newComicID;	// set in saveAndContinue()

var curComicFramesCount;

var curComicFrames = [];	// store frames for editing - array will be used to overwrite existing in DB
var curComicTitle;			// use to store title for editing
var currentFrame = 1;
var frameIsUnique = true;	// used for multiple AR trackables
var isAREnabled = true;	// used to control screen copy 




function viewAllFrames(showDelete)
{
	debug("viewAllFrames  showDelete " + showDelete);
	
	showWebSpinner();
	
	
	if(showDelete){
		$('#vfEdit').hide();
		$('#vfDone').show();
	}else{
		$('#vfDone').hide();
		$('#vfEdit').show();
	}
	
	if(newComic){
		var cID = newComicID;
	}else{
		var cID = selectedComicID;
	}
	
	//debug("viewAllFrames  cID " + cID);
	
	$('#framesScreen').show();
	$('#frameObjs').show();
	cancelComicTitle();
	
	
	// create to store frames for editing
	curComicFrames = [];
	
	
	$('#frameObjs').html("");
	var htmlStr = "<div class='viewFrame'>";
	
	
	
	var transaction = realTagrDB.transaction(["realTagrDB"], "readonly").objectStore("realTagrDB");
	var request = transaction.get(cID);
	
	request.onsuccess = function(event) {
		
		if(request.result) {

			
			var title = curComicTitle = request.result.comicName;
			
			//debug("DB title  " + title);
			//debug("DB frames  " + request.result.comicFrames.length);
			
			
			isAREnabled = request.result.arEnabled;
			
			$('#framesComicTitle').html("<p><span class='titleChange'>[EDIT] </span>" + title + "</p>");
			$('#editcomicname').val(title);
			
			
			for(var i=0; i<request.result.comicFrames.length; i++){ 
			
				curComicFrames.push(request.result.comicFrames[i]);
			
				
				/* // show delete only when list generated from EDIT button on view frames screen
				if(showDelete){
					
					var fID = "frameID"+i;
					htmlStr += "<div class='vframe' id='" + fID + "' >";
					
					htmlStr += "<div class='vfDelBtn' ontouchstart='return true;' ontouchend='deleteSingleFrame(" + i + ")'>DELETE</div>";
					
				}else{
					htmlStr += "<div class='vframe'>";
				} */
				
				
				//var fID = "frameID"+i;
				//htmlStr += "<div class='vframe' id='" + fID + "' >";
				htmlStr += "<div class='vframe'>";
				
				htmlStr += "<div class='vfDelBtn' ontouchstart='return true;' ontouchend='deleteSingleFrame(" + i + ")'>DELETE</div>";
				
				
				var track = request.result.comicFrames[i].frameTrigger;
				var des = request.result.comicFrames[i].frameDesign;
				
				//debug("DB track  " + track.substring(1,30));
				
				var trackable = new Image();
				trackable.src = track;
				
				var design = new Image();
				design.src = des;
				
				
				var desID = "desID"+i;
				var bgID = "bgID"+i;
				
				htmlStr += "<div class='vframeDes' id='" + desID + "'><img class='vframeDesImg' src='" + design.src + "'></div>";
				htmlStr += "<div class='vframeBG' id='" + bgID + "'><img class='vframeDesImg' src='" + trackable.src + "'></div>";
				
				// end vframe
				htmlStr += "</div>";
				
			}
			
			// add ADD FRAME if space
			//if(request.result.comicFrames.length < 12 && !showDelete){
			if(request.result.comicFrames.length < 12){
				
				htmlStr += "<div class='vframeAdder'><div class='vframeAddWrapper'><div class='vframeAdd' ontouchstart='return true;' ontouchend='viewFrameOptions(\"addnew\")'>";
				htmlStr += "<div class='vaddCircle'>+</div><div class='vaddText'>ADD FRAME</div>";
				htmlStr += "</div></div></div>";
				
			}
			
			// finish and display HTML
			htmlStr += "</div>";
			$('#frameObjs').html(htmlStr);
			
			hideWebSpinner();
			
		} else {
			//debug(" couldn't be found in your database!");
		}
	};
	request.onerror = function(event) {
		//debug("Unable to retrieve data from database!");
	};
};


function showFrameDeleteButtons()
{
	$('.vfDelBtn').each(function( index, obj ) {
		$(this).css( "display", "block");
	});
	$('.vframeAdder').hide();
	$('#vfEdit').hide();
	$('#vfDone').show();
}


function hideFrameDeleteButtons()
{
	$('.vfDelBtn').each(function( index, obj ) {
		$(this).css( "display", "none");
	});
	
	$('#vfDone').hide();
	$('#vfEdit').show();
}

function viewFrameOptions(act)
{
	debug("viewFrameOptions > act = " + act + "   closeBackTo = " + closeBackTo);
	
	// disable drawing mode
	cancelDrawingMode();
	
	$('#myComicsScreen').hide();
	
	if(act == "edit"){

		// set the class on the delete buttons to block
		showFrameDeleteButtons();
		
    }else if(act == "addnew"){
		
		//debug("BACK TO CHECK  > addnew ?  isAREnabled = " + isAREnabled);
		
		$('#framesScreen').hide();
		$('#frameObjs').hide();
		
		if(isAREnabled){
			
			if(newComic){
				var cID = newComicID;
			}else{
				var cID = selectedComicID;
			}
			getComicData(cID);	// __mycomics
			
		}else{
			
			$('#addnewbtn').css('opacity',1);
			
			// let user create new background
			closeBackTo = "frames";

			$('#screenshotWrapper').hide();
			$('#designScreen').hide();
			
			$('#newFrameScreen').show();
			
		}
		
    }else if(act == "close"){
		
		// both of these call close
		$('#newFrameScreen').hide();
		$('#framesScreen').hide();
		$('#frameObjs').hide();
		
		
		if(closeBackTo == "mycomics"){
			
			showScreen('mycomics');
			getMyComicsData();
			
			closeBackTo = null;
			
		}else if(closeBackTo == "designer"){	
		
			// check to see if this comic still has frames - if not can't go to designer
			
			//debug("BACK TO CHECK  > curComicFramesCount = " + curComicFramesCount);
			
			if(curComicFramesCount == 0){
				
				//debug("BACK TO CHECK  > SHOW MY COMICS" );
				
				$('#screenshotWrapper').hide();
				$('#designScreen').hide();
				
				showScreen('mycomics');
				getMyComicsData();
			
				closeBackTo = null;
				
			}else{
			
				$('#screenshotWrapper').show();
				$('#designScreen').show();
			}
			
		}else{
			
			closeBackTo = "mycomics";
			
			$('#newFrameScreen').hide();
			$('#framesScreen').show();
			$('#frameObjs').show();
			
		}
		
    }else if(act == "done"){
       
	   // save edited frames array in DB
	   updateFramesDB();
    }	
};



// called from trackablesScreen HTML button
function backToNewFrame()
{
	$('#captureScreen').hide();
	$('#trackablesScreen').hide();
    $('#newFrameScreen').show();
};


// called from framesScreen
function changeComicTitle()
{
	$('.vframeTitle').show();
	$('#frameObjs').hide();
};


function cancelComicTitle()
{
	$('.vframeTitle').hide();
	$('#frameObjs').show();
	
	document.activeElement.blur();
};


function updateComicTitle()
{
	var newComicTitle = $('#editcomicname').val();
	
	if(newComicTitle.length < 1){
		// not going to update if name isn't entered
		$('#editcomicname').val(curComicTitle);
		
		document.activeElement.blur();
	}else{
		// save new title
		saveComicTitle(newComicTitle);
		
		document.activeElement.blur();
	}
};


function saveComicTitle(str) 
{
	//debug("saveComicTitle > str = " + str);
	
	//showWebSpinner();
	
	var cID = selectedComicID;
	
	
	var transaction = realTagrDB.transaction(["realTagrDB"], "readwrite").objectStore("realTagrDB");
	var request = transaction.get(cID);
	
	request.onsuccess = function(event) {
		
		if(request.result) {
			
			
			var item = event.target.result;
			item.comicName = str;
				
			var req = transaction.put(item);
			req.onsuccess = function(ev){
				//debug('Successfully edited key');
            };
            req.onerror = function(ev){
               //debug('Error occured', ev.srcElement.error.message);
            };
			
			// finish 
			$('#framesComicTitle').html("<p><span class='titleChange'>[EDIT] </span>" + str + "</p>");
			
			// use cancel to switch screens back
			cancelComicTitle();
			
			//hideWebSpinner();
			
		} else {
			//debug(" couldn't be found in your database!");
		}
	};
	request.onerror = function(event) {
		//debug("Unable to retrieve data from database!");
	};
};


// called from frame delete buttons - just hide the frame and set state in temp array
function deleteSingleFrame(id)
{
	// debug("deleteSingleFrame id > " + id);
	
	if(curComicFrames[id].isDeleted){
		
		curComicFrames[id].isDeleted = false;
		/* $("#desID"+id).css("opacity", 1);
		$("#bgID"+id).css("opacity", 1); */
		
		
		$("#desID"+id).removeClass("grayscale");
		$("#bgID"+id).removeClass("grayscale");
   
		
	}else{
		curComicFrames[id].isDeleted = true;
		/* $("#desID"+id).css("opacity", .5);
		$("#bgID"+id).css("opacity", .5); */
		
		$("#desID"+id).addClass("grayscale");
		$("#bgID"+id).addClass("grayscale");
	}
	
	//$("#frameID"+id).hide();
};



function updateFramesDB()
{
	debug("updateFramesDB ");
	
	showWebSpinner();
	
	hideFrameDeleteButtons();
	
	var cID = selectedComicID;
	
	
	var transaction = realTagrDB.transaction(["realTagrDB"], "readwrite").objectStore("realTagrDB");
	var request = transaction.get(cID);
	
	request.onsuccess = function(event) {
		
		if(request.result) {

			var finalArr = [];
				
			// loop through curComicFrames and remove any that are set as deleted
			for(var i=0; i<curComicFrames.length; i++){
				var delFrame = curComicFrames[i].isDeleted;
				if(!delFrame) finalArr.push(curComicFrames[i]);
			}
			
			var item = event.target.result;
			item.comicFrames = finalArr;
			
			curComicFramesCount = finalArr.length;
			debug('curComicFramesCount = ' + curComicFramesCount);
			
				
			var req = transaction.put(item);
			req.onsuccess = function(ev){
				//debug('Successfully edited key');
            };
            req.onerror = function(ev){
               //debug('Error occured', ev.srcElement.error.message);
            };
			
			
			hideWebSpinner();
			
			// finish - clear temp array
			curComicFrames = null;
			
			viewAllFrames(false);
			
		} else {
			//debug(" couldn't be found in your database!");
		}
	};
	request.onerror = function(event) {
		//debug("Unable to retrieve data from database!");
	};
};



function saveAndContinue(act)
{
    debug("saveAndContinue  > act = " + act +  " > newComic = " + newComic);
	
	// save current frame images
	var trackable = String(getTrackingImg());
	var design = String(getCanvasImg());
	
	
	// open DB
	var transaction = realTagrDB.transaction(["realTagrDB"], "readwrite").objectStore("realTagrDB");
	
	
	if(newComic){
	
		// get the ID of the last comic added to the DB
		var limit = 1;
		var i = 0;
		
		var comicId;
		
		// open cursor
		var req = transaction.openCursor(null, 'prev');
		
		req.onsuccess = function(event) {
		
			var cursor = event.target.result;
			if (cursor && i < limit) {
				i += 1;
				
				newComicID = comicId = cursor.value.id;
				//debug("LAST comicId " + comicId);
				
				cursor.continue();
			}else{
				
				// open DB record with id = comicId
				var req2 = transaction.get(comicId);
				
				req2.onerror = function(event) {
					// Handle errors!
					//debug("error " + event);
				};
				req2.onsuccess = function(event){
					
					//debug("onsuccess > try adding frame" );
					
					var frameObj = {frameNum:currentFrame,frameTrigger:trackable,frameDesign:design,trackableNum:curTrackableNum,isUnique:frameIsUnique};
					
					// push comic frames into DB comic
					var comic = event.target.result;
					comic.comicFrames.push(frameObj);
					
					// update DB
					var requestUpdate = transaction.put(comic);
					
					requestUpdate.onerror = function(event) {
						// Do something with the error
						//debug("frame not added error " + event);
					};
					requestUpdate.onsuccess = function(event) {
						// Success - the data is updated!
						//debug("frame added = success");
						
						if(act == "addnew"){
							finishAddingFrame();
						}else if(act == "makecopy"){
							finishDuplicatingFrame();
						}else if(act == "save"){
							finishSavingFrame();
						}
						
					};
				}
			}
		}
		
	}else{
	
		// use selectedComicID as stored when selecting in myComics
		var comicId = selectedComicID;
		
		debug("selectedComicID " + selectedComicID);
		
		
		// open DB record with id = comicId
		var req = transaction.get(comicId);
		
		req.onerror = function(event) {
			// Handle errors!
			debug("error " + event);
		};
		req.onsuccess = function(event){
			
			debug("onsuccess > try adding frame" );
			
			//debug("curTrackableNum > " + curTrackableNum);
			//debug("frameIsUnique   > " + frameIsUnique);
			
			var frameObj = {frameNum:currentFrame,frameTrigger:trackable,frameDesign:design,trackableNum:curTrackableNum,isUnique:frameIsUnique};
			
			// push comic frames into DB comic
			var comic = event.target.result;
			comic.comicFrames.push(frameObj);
			
			//debug("comic.comicFrames.push "  + comic.comicFrames.length);
			
			// update DB
			var requestUpdate = transaction.put(comic);
			
			requestUpdate.onerror = function(event) {
				// Do something with the error
				//debug("frame not added error " + event);
			};
			requestUpdate.onsuccess = function(event) {
				// Success - the data is updated!
				//debug("frame added = success");
				
				if(act == "addnew"){
					finishAddingFrame();
				}else if(act == "makecopy"){
					finishDuplicatingFrame();
				}else if(act == "save"){
					finishSavingFrame();
				}
			};
		}
	}
};


function finishAddingFrame()
{
	debug("finishAddingFrame" );
	
	if(isAREnabled){
		cleanUpCanvas();
	
	}else{
		// show message use same trackable or create a new one
		$('#nfCopy').show();
		showScreen("newFrameScreen");
		
		// reset drawing tools to default
		setDefaultDrawing();
	}
	
	// increment frame
	currentFrame++;
    
    if(currentFrame <= maxFrames){
		
		if(isAREnabled){
			// flash canvasses to indicate duplication process
			$("#designerCanvasWrapper").velocity("callout.flash", 300);
			$("#screenshotWrapper").velocity("callout.flash", 300);
		}
		
		setFrameMarker();
    }
};


function finishDuplicatingFrame()
{
    debug("finishDuplicatingFrame" );
	
	//if(isAREnabled) cleanUpCanvas();
	
	// increment frame
	currentFrame++;
	
    if(currentFrame <= maxFrames){
		
		// flash canvasses to indicate duplication process
		$("#designerCanvasWrapper").velocity("callout.flash", 300);
		$("#screenshotWrapper").velocity("callout.flash", 300);
    
		setFrameMarker();
    }
};


function finishSavingFrame()
{
	debug("finishSavingFrame" );
	
	cleanUptrackingCanvas();
	
	newComic = false;
	
	showScreen("saveFrameScreen");
	
	// reset drawing tools to default
	setDefaultDrawing();
};


// called from button on saveFrameScreen
function saveFrameNext(act)
{
	//debug("saveFrameNext " + act);
	
	$('#saveFrameScreen').hide();
	
	// clear canvasses
	cleanUpCanvas();
	cleanUptrackingCanvas();
	setDefaultDrawing();
	
	currentFrame = 1;
	
	setFrameMarker();

	
	// update display with frame number
	
    if(act == 'mycomics'){
		
		userMode = 'mycomics';
		showScreen("mycomics");
		getMyComicsData();
		
    }else if(act == 'newcomic'){
		
		userMode = 'newcomic';
		showScreen("newcomic");
		getAllComics();
		
    }else if(act == 'home'){
		returnToHome();
	}
};


// called from button on newFrameScreen
function newFrameTrackable(act)
{
    debug("newFrameTrackable " + act);
	
	$('#newFrameScreen').hide();
    
    if(act == 'new'){
		
		frameIsUnique = true;
		
		// curTrackableNum needs to be set to the highest number in the current comic + 1
		// curTrackableNum can be set lower by selecting an existing trackable from the list
		// need to run through current comic to find the highest value
		
		getHighestTrackableNum('fromDesign');
		
    }else{
		
		// copy existing trackable
		frameIsUnique = false;

		// clear canvasses
		trackingCanvas.clear();
		cleanUpCanvas();
		
		// display list of trackables in current comic
		$('#trackablesScreen').show();
		
		// generate list of trackables
		getMyComicsTrackables();
    }
};


function getHighestTrackableNum(fn)
{
	debug("getHighestTrackableNum > fn = " +fn);
	
	showWebSpinner();
	
	var trackNum = 0;
	
	if(newComic){
		var cID = newComicID;
	}else{
		var cID = selectedComicID;
	}
	
	//debug(" cID > " + cID);
	
	
	var transaction = realTagrDB.transaction(["realTagrDB"], "readonly").objectStore("realTagrDB");
	var request = transaction.get(cID);
	
	request.onsuccess = function(event) {
		
		if(request.result) {
			
			for(var i=0; i<request.result.comicFrames.length; i++){
				if(request.result.comicFrames[i].trackableNum > trackNum){
					trackNum = request.result.comicFrames[i].trackableNum;
				}
			}
			
			curComicFramesCount = request.result.comicFrames.length;
			
			debug(" getHighestTrackableNum > curComicFramesCount: " + request.result.comicFrames.length );
			
			// set current frame
			currentFrame = request.result.comicFrames.length + 1;
			
			setFrameMarker();
			
			// finish 
			debug("getHighestTrackableNum  DONE > trackNum = " + (Number(trackNum) + 1));
			
			// finish and return number
			if(fn == 'fromMyComics' && request.result.comicFrames.length > 0){
				trackNumCallbackMyComic(trackNum + 1);
			}else{
				trackNumCallback(trackNum + 1);
			}
			
			hideWebSpinner();
			
		} else {
			//debug(" couldn't be found in your database!");
		}
	};
	request.onerror = function(event) {
		//debug("Unable to retrieve data from database!");
	};
};


function trackNumCallbackMyComic(num)
{
	debug("trackNumCallbackMyComic " + num);
	
	setCurTrackableNum(num);
	
	setFrameMarker();
	
	$('#myComicsScreen').hide();
	$('#screenshotWrapper').hide();
	
	debug("isAREnabled " + isAREnabled);
	debug("curComicFramesCount " + curComicFramesCount);
	
	if(isAREnabled){
		
		if(curComicFramesCount == 0){
			
			// need a new AR trackable
			$('#newFrameScreen').show();
			
		}else{
		
			//$('#addnewbtn').css('opacity',.2);
			
			if(newComic){
				var cID = newComicID;
			}else{
				var cID = selectedComicID;
			}
			
			// copy existing background image and show design
			selectTrackable(cID, 0, num);
		}
		
	}else{
		
		//$('#addnewbtn').css('opacity',1);
		
		// let user create new background
		$('#newFrameScreen').show();
	}
};


function trackNumCallback(num)
{
	debug("trackNumCallback " + num);
	
	setCurTrackableNum(num);
	
	// clear canvasses
	trackingCanvas.clear();
	dwgCanvas.clear();
	
	$('#screenshotWrapper').hide();
	$('#designScreen').hide();
	$('#newFrameScreen').hide();
	$('#captureDrag').hide();
	
	$('#camera').show();
	$('#cameraTitle').show();
	$('#captureScreen').show();
	$('#screenshotWrapper').show();
};


function setCurTrackableNum(num)
{
	//debug("SETCURTRACKABLENUM > num = " + num);
	
	curTrackableNum = num;
};


// called after add new frame > use existing trackable __frames
function getMyComicsTrackables() 
{
	debug("getMyComicsTrackables  > newComic " + newComic);
	
	showWebSpinner();
	
	if(newComic){
		var cID = newComicID;
	}else{
		var cID = selectedComicID;
	}
	
	var htmlStr = "";
	
	
	var transaction = realTagrDB.transaction(["realTagrDB"], "readonly").objectStore("realTagrDB");
	var request = transaction.get(cID);
	
	request.onsuccess = function(event) {
		
		if(request.result) {
			
			for(var i=0; i<request.result.comicFrames.length; i++){ 
				
				// var frameObj = {frameNum:currentFrame,frameTrigger:trackable,frameDesign:design,trackableNum:curTrackableNum,isUnique:frameIsUnique};
				
				var trackNum = request.result.comicFrames[i].trackableNum;
				var track = request.result.comicFrames[i].frameTrigger;
				
				var trackable = new Image();
				trackable.src = track;
				
				htmlStr += "<div class='trackableObjPicker' ontouchend='selectTrackable(" + cID + "," + i + "," + trackNum + ")'><img src='" + trackable.src + "' /></div>";
				
			}
			
			
			// finish 
			$('#trackableObjs').html(htmlStr);
			
			hideWebSpinner();
			
		} else {
			//debug(" couldn't be found in your database!");
		}
	};
	request.onerror = function(event) {
		//debug("Unable to retrieve data from database!");
	};
};


// get selected trackable from the database and add it to the trackable canvas - init design
function selectTrackable(comicID, trackableid, trackableNum)
{
	debug("selectTrackable  > comicID = " + comicID + " >  trackableid = " + trackableid + " > trackableNum = " + trackableNum);
	
	// set curTrackableNum so it can be stored when saving the frame
	var tNum = trackableNum;
	
	setCurTrackableNum(tNum);
	
	var transaction = realTagrDB.transaction(["realTagrDB"]);
	var objectStore = transaction.objectStore("realTagrDB");
	var request = objectStore.get(comicID);
	
	request.onsuccess = function(event) {
		
		if(request.result) {

			// get trackable image data
			var track = request.result.comicFrames[trackableid].frameTrigger;
			setTrackingImg(track);
			
			// set current frame
			currentFrame = request.result.comicFrames.length + 1;
			
			setFrameMarker();
			
			// open designer
			$('#trackablesScreen').hide();
			$('#designScreen').show();
			$('#screenshotWrapper').show();
			
			// lock image on screenshot
			trackingCanvas.lockMovementX = trackingCanvas.lockMovementY = true;
			
		} else {
			//debug(" couldn't be found in your database!");
		}
	};
	request.onerror = function(event) {
		//debug("Unable to retrieve data from database!");
	};
};


function setTrackingImg(src)
{
	//debug("=====   setTrackingImg ");
		
	var img = new Image();
	img.onload = function() {
		img.width = 750;
		img.height = 750;
        var imgbase64 = new fabric.Image(img);
		trackingCanvas.clear();
		trackingCanvas.add(imgbase64);
        trackingCanvas.renderAll();
		
		//debug(this.width + ' x ' + this.height);
	};
	img.src = src;
};









