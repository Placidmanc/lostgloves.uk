
var objectCounter = 0;

var curObject, curObjectType, objsOpen, designMode;

var objectSelected = false;
var isDrawingMode = false;
var desObjMenuOpen = false;




/* toBack, toFront, moveBack, moveFront */
function disableEditBtns()
{
	//debug("disableEditBtns");
	
	if(objectCounter == 0) $('#edit-clear').css('opacity',.2);
	
	$('#edit-tb').css('opacity',.2);
	$('#edit-tf').css('opacity',.2);
    $('#edit-mb').css('opacity',.2);
	$('#edit-mf').css('opacity',.2);
	$('#edit-del').css('opacity',.2);
};

function enableEditBtns()
{
	//debug("enableEditBtns");
	
	$('#edit-clear').css('opacity',1);
	$('#edit-tb').css('opacity',1);
	$('#edit-tf').css('opacity',1);
    $('#edit-mb').css('opacity',1);
	$('#edit-mf').css('opacity',1);
	$('#edit-del').css('opacity',1);
};


function closeDesMenuBtns()
{
    
	//$('.desObjectsWrapper').hide();
	
	// set buttons to default
    $('#stbtn').css('background','#d63f2b');
    $('#stbtn').css('color','#fff');
    
    $('#cabtn').css('background','#d63f2b');
    $('#cabtn').css('color','#fff');
    
    $('#eybtn').css('background','#d63f2b');
    $('#eybtn').css('color','#fff');
	
	$('#mobtn').css('background','#d63f2b');
    $('#mobtn').css('color','#fff');
	
	$('#tebtn').css('background','#d63f2b');
    $('#tebtn').css('color','#fff');
	
	$('#drbtn').css('background','#d63f2b');
    $('#drbtn').css('color','#fff');
	
	$('#toolsDrawMenu').hide();
	$('#toolsTextMenu').hide();

};


function onObjectSelected(e) 
{
	curObject = e.target;
	curObjectType = e.target.get('type');
	objectSelected = true;
	enableEditBtns();
	
	//debug("curObjectType " + curObjectType );
};


function onObjectsRelease()
{
	objectSelected = false;
	curObject = null;
	curObjectType = null;
	disableEditBtns();
};


/* IMPORT USER IMAGE */
function importDeviceImageDraw(evt)
{
	var files = evt.target.files;
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {

		if (!f.type.match('image.*')) {
			continue;
		}
		var reader = new FileReader();
		myAppModuleDraw.init(f, reader);
		reader.onload = myAppModuleDraw.OnloadFile;
		reader.readAsDataURL(f);
	}
};

var myAppModuleDraw = (function () {
	
	var outObj = {};

	var file, fileReader, img, cImg;

	var init = function (newFile, newFileReader) {
		file = newFile;
		fileReader = newFileReader;
	};

	var onloadImage = function () {
		
		cImg = new fabric.Image(img, {
			lockMovementX:false,
			lockMovementY:false,
			lockRotation:false,
			lockScalingX:false,
			lockScalingY:false,
			selectable:true,
			originX: 'center',
			originY: 'center',
			top: dwgCanvas.height/2,
			left: dwgCanvas.width/2,
			hasControls: true,
			hasRotatingPoint: true,
			hasBorders: true,
            scaleY: 0.7,
			scaleX: 0.7,
			cornerSize: 22,
			borderColor:'rgba(255,255,255,0.6)',
			cornerColor :'rgba(255,255,255,0.6)',
			borderOpacityWhenMoving :0, 
			minScaleLimit:0.02,
			padding:15, 
			transparentCorners:true
		});
		
		// add user image to canvas
		dwgCanvas.add(cImg);
		
		// select last item added
		dwgCanvas.setActiveObject(dwgCanvas.item(dwgCanvas.getObjects().length - 1));
	
		// keep track of number of items added
		objectCounter++;
		
		resetHistory();
		
	};
	var onloadFile = function (e) {
		img = new Image();
		img.onload = onloadImage;
		img.src = fileReader.result;
	};

	outObj.init = init;
	outObj.OnloadFile = onloadFile;

	return outObj;
})();




/* BACKGROUND/TRIGGER IMAGE */
function importDeviceImage(evt)
{ 
	//debug("importDeviceImage ");
	
	var files = evt.target.files;
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {

		if (!f.type.match('image.*')) {
			continue;
		}
		var reader = new FileReader();
		myAppModule.init(f, reader);
		reader.onload = myAppModule.OnloadFile;
		reader.readAsDataURL(f);
	}
};

var myAppModule = (function () {
	
	var outObj = {};

	var file, fileReader, img, cImg;
	
	var init = function (newFile, newFileReader) {
		file = newFile;
		fileReader = newFileReader;
	};

	var onloadImage = function () {
		
		//debug("importDeviceImage onloadImage");
		
		cImg = new fabric.Image(img, {
			lockMovementX:false,
			lockMovementY:false,
			lockRotation:false,
			selectable:true,
			originX: 'center',
			originY: 'center',
			top: trackingCanvas.height/2,
			left: trackingCanvas.width/2,
			hasControls: false,
			hasRotatingPoint: false,
			hasBorders: false,
            scaleY: 0.4,
			scaleX: 0.4
		});
		
		// add image to canvas
		trackingCanvas.add(cImg);

		// what to do after image has loaded
		showScreen('captureDrag');
	};

	var onloadFile = function (e) {
		img = new Image();
		img.onload = onloadImage;
		img.src = fileReader.result;
	};

	outObj.init = init;
	outObj.OnloadFile = onloadFile;

	return outObj;
})();




function addGloveImg(id)
{
	console.log("addGloveImg " + id);
	
	
	
	var imgURL = "../imgs/glove15.jpg";
    
	fabric.Image.fromURL(imgURL, function(img){
	
		var scale = 1;
		var pos = 0;
		
		img.set({
			hasRotatingPoint: false,
			borderOpacityWhenMoving :0, 
			minScaleLimit:0.02,
			padding:2, 
			transparentCorners:false,
			originX: 'left',
			originY: 'top',
			scaleX:scale,
			scaleY:scale,
			top:pos,
			left:pos,
			lockScalingFlip: true,
			lockUniScaling : true
		});
		
		// add to glove canvas
		gloveCanvas.add(img);
		
		
	});
};




// called from captureScreen > swap screens and lock canvas image
function finishCapture()
{
	
	//debug("finishCapture");
	
	disableEditBtns();
	
	showScreen('designScreen');

	// lock image
	trackingCanvas.lockMovementX = trackingCanvas.lockMovementY = true;
};


// called from buttons on framesMenu in designScreen
function designOptions(act)
{
	debug("designOptions  " + act + "  currentFrame " + currentFrame + "  loggedin " + loggedin);
	
	
	//debug("               currentFrame " + currentFrame + "  maxFrames " + maxFrames);
	
	
	// disable buttons if not logged in
	if(!loggedin) return;
	
	
	
	if((currentFrame == maxFrames) && (act == "addnew" || act == "makecopy")){
		
		debug("STOP" );
		return;
	}
		
	
	checkSlidersClosed();
	
	if(isDrawingMode){
		dwgCanvas.isDrawingMode = false;
		isDrawingMode = false;
		dwgCanvas.renderOnAddRemove = true;
	}
	
	designMode = null;
	
	$('#desObjs').velocity("scroll", {container: $(".desObjectsWrapper"),  duration: 50});
	
	closeDesMenuBtns();
	
	if(act == "viewall"){
		
		closeBackTo = "designer";
		
		if(currentFrame > 1) viewAllFrames(false);
		
	}else{
		
		closeBackTo = "designer";
		
		// single function to handle all frame actions and continue to next method
		saveAndContinue(act);		// __frames
	}
};


// called from buttons in arrangeMenu in designScreen
function arrange(act)
{
    checkSlidersClosed();
	
	if(act == "back"){
        moveToBack();
    }else if(act == "front"){
        moveToFront();
    }else if(act == "moveback"){
        moveBack();
    }else if(act == "movefront"){
        moveForward();
    }else if(act == "delete"){
        cutObect();
    }else if(act == "clearall"){
		cleanUpCanvas();
	}
};


function moveToBack()
{
	if(!objectSelected) return;
	dwgCanvas.sendToBack(curObject);
};


function moveToFront()
{
	if(!objectSelected) return;
	dwgCanvas.bringToFront(curObject);
};


function moveBack()
{
	if(!objectSelected) return;
	dwgCanvas.sendBackwards(curObject);
};


function moveForward()
{
	if(!objectSelected) return;
	dwgCanvas.bringForward(curObject);
};


function cutObect()
{
	if(!objectSelected) return;
	dwgCanvas.getActiveObject().remove();
	
	objectCounter--;	
	historyPosition--;
	
	//debug("SET CUT DEC objectCounter = " + objectCounter);
};


function cleanUpCanvas()
{
    objectCounter = 0;
	disableEditBtns();
	resetHistory();
	
	dwgCanvas.clear();
};


function cleanUptrackingCanvas()
{
    //debug("---------------------------------   cleanUpCanvas ");
    trackingCanvas.clear();
};


// called from buttons in designOjectsMenu in designScreen
function toggleDesignObjects(sect)
{
	debug("toggleDesignObjects > desObjMenuOpen = " + desObjMenuOpen + "  objsOpen > [" + objsOpen + "]   sect > [" + sect + "]");
	
	
	checkSlidersClosed();
	
	
	var toggleDrawTextOff = false;
	
	
	if((designMode == "draw" && sect == "dr") || (designMode == "text" && sect == "te")){
		toggleDrawTextOff = true;
		designMode = null;
	}
	
	
	
	closeDesMenuBtns();
	
	if(isDrawingMode){
		dwgCanvas.isDrawingMode = false;
		isDrawingMode = false;
		
		dwgCanvas.renderOnAddRemove = true;
	}
	
	
	if(toggleDrawTextOff) return;
	
	
	// design objects
	if(desObjMenuOpen){
		
		if(objsOpen == sect){
			
			//debug("close menu if same button pressed");
			$('.desObjectsWrapper').hide();
			desObjMenuOpen = false;
			
			return;
		}else{
			
			//debug("scroll and clear different button pressed");
			$('#desObjs').velocity("scroll", {container: $(".desObjectsWrapper"),  duration: 0});
			//$('.desObjectsWrapper').show();
		}
	}else{
		
		if(objsOpen == sect){
			//debug("open menu where it was ");
			
		}else{
			
			//debug("reset and open new list");
			$('#desObjs').velocity("scroll", {container: $(".desObjectsWrapper"),  duration: 0});
		}
		//$('.desObjectsWrapper').show();
	}
	
	

    if(sect == 'bg'){
		
		$('#desObjs').html(bg);
		
		$('.desObjectsWrapper').show();
        
		$('#bgbtn').css('background','white');
        $('#bgbtn').css('color','black');
		
		desObjMenuOpen = true;
        objsOpen = sect;
		
		designMode = null;
		
	}else if(sect == 'st'){
		
		$('#desObjs').html(st);
		
		$('.desObjectsWrapper').show();
        
		$('#stbtn').css('background','white');
        $('#stbtn').css('color','black');
		
		desObjMenuOpen = true;
        objsOpen = sect;
		
		designMode = null;
		
	}else if(sect == 'ca'){
		
		$('#desObjs').html(ca);
		
		$('.desObjectsWrapper').show();
       
		$('#cabtn').css('background','white');
        $('#cabtn').css('color','black');
		
		desObjMenuOpen = true;
        objsOpen = sect;
		
		designMode = null;
		
	}else if(sect == 'ey'){
		
		$('#desObjs').html(ey);
		
		$('.desObjectsWrapper').show();
       
		$('#eybtn').css('background','white');
        $('#eybtn').css('color','black');
		
		desObjMenuOpen = true;
        objsOpen = sect;
		
		designMode = null;
		
	}else if(sect == 'mo'){
		
		$('#desObjs').html(mo);
		
		$('.desObjectsWrapper').show();
        
		$('#mobtn').css('background','white');
        $('#mobtn').css('color','black');
		
		desObjMenuOpen = true;
        objsOpen = sect;

		designMode = null;		
		
	}else if(sect == 'te'){
		
		$('.desObjectsWrapper').hide();
		
		// add text
        $('#tebtn').css('background','white');
        $('#tebtn').css('color','black');
        
        $('#toolsTextMenu').velocity("fadeIn", {duration: screenFade });
		
		designMode = "text";
		
		objsOpen = null;
		
	}else if(sect == 'dr'){
		
		$('.desObjectsWrapper').hide();
		
		// draw
        $('#drbtn').css('background','white');
        $('#drbtn').css('color','black');
        
        $('#toolsDrawMenu').velocity("fadeIn", {duration: screenFade });
		
		updateBtns();
		
		dwgCanvas.isDrawingMode = true;
		isDrawingMode = true;
		
		objsOpen = null;
		
		dwgCanvas.renderOnAddRemove = false;
		
		designMode = "draw";
	}
};



// called from generated design objects list items
function selectDesignObj(imgID)
{
	//debug("selectDesignObj " + imgID);
	
	dwgCanvas.deactivateAll().renderAll();
    
    $('.desObjectsWrapper').hide();
	desObjMenuOpen = false;
	
    closeDesMenuBtns();
	
	
    
	var imgURL = "resources/" + imgID + ".png";
    
	fabric.Image.fromURL(imgURL, function(img){
	
		var scale = 0.5;
		var pos = 750/2;
		
		img.set({
			hasControls: true,
			hasRotatingPoint: true,
			hasBorders: true,
			cornerSize: 22,
			borderColor:'rgba(255,255,255,0.6)',
			cornerColor :'rgba(255,255,255,0.6)',
			borderOpacityWhenMoving :0, 
			minScaleLimit:0.02,
			padding:15, 
			transparentCorners:true,
			originX: 'center',
			originY: 'center',
			scaleX:scale,
			scaleY:scale,
			top:pos,
			left:pos
		});
		
		// add to drawing canvas
		dwgCanvas.add(img);
		
		// select last item added
		dwgCanvas.setActiveObject(dwgCanvas.item(dwgCanvas.getObjects().length - 1));
		
		// keep track of number of items added
		objectCounter++;

		resetHistory();
	
	});
};


function cancelDrawingMode()
{
	dwgCanvas.isDrawingMode = false;
	isDrawingMode = false;
}


// called from toolsDrawMenu in designScreen
function drawTools(act)
{
	//debug("=====   drawTools " + act);
	
	if(act == 'undo'){
		goThroughHistory(false, dwgCanvas);
	}else if(act == 'redo'){
		goThroughHistory(true, dwgCanvas)
	}else if(act == 'size'){
		toggleSizePicker();
	}
};



function toggleSizePicker()
{
	//debug("toggleSizePicker > sizePickerShowing = " + sizePickerShowing);
	
	// toggle line width selector
	if(sizePickerShowing){
		
		$('#size-container').velocity("fadeOut", {duration: screenFade });
		sizePickerShowing = false;
		$('#drawing-size').css('background','#d63f2b');
        $('#drawing-size').css('color','#fff');
		
	}else{
		
		$('#size-container').velocity("fadeIn", {duration: screenFade });
		sizePickerShowing = true;
		$('#drawing-size').css('background','white');
        $('#drawing-size').css('color','black');
		
	}		
};



function getCanvasImg()
{
	dwgCanvas.deactivateAll().renderAll();
    
    var data = dwgCanvas.toDataURL({
        format: 'png'
    });
	return data;
};


function getTrackingImg()
{
    //debug("getTrackingImg ");

    var data = trackingCanvas.toDataURL({
        format: 'jpeg',
        quality: 0.92
    });
    return data;
};





