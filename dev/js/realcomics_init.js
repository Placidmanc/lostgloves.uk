var screenFade = 200;

var dwgCanvas, gloveCanvas;

var sizePickerShowing = false;
var lineHeightPickerShowing = false;
var strokeWidthPickerShowing = false;
var fontPickerShowing = false;
var fontSizePickerShowing = false;






function initDrawing(gloveID)
{
	debug("initDrawing > gloveID = " + gloveID);
	
	// set defaults and init controls
    defineCanvasses();
	setDefaultDrawing();
    createDrawingLists();	// __utils
	resetHistory();			// __history
	
	// add glove image
	addGloveImg(gloveID);
}



function defineCanvasses()
{
    // glove canvas
	gloveCanvas = new fabric.Canvas('gloveCanvas');
	
	
	disableEditBtns();		// __drawing

    // drawing canvas
    dwgCanvas = new fabric.Canvas('canvas', {
		perPixelTargetFind: true,
		selection:false,
		targetFindTolerance:10,
		enableRetinaScaling: true,
		isDrawingMode: false,
		preserveObjectStacking:true,
		renderOnAddRemove:true
	});
	dwgCanvas.width = 750;
	dwgCanvas.height = 750;
	
	
	fabric.Object.prototype.transparentCorners = false;
	
	dwgCanvas.freeDrawingBrush.color = $('#drawing-color').val();
	dwgCanvas.freeDrawingBrush.width = 5;
	
	dwgCanvas.on('selection:cleared', function(){
		if(!dwgCanvas.isDrawingMode) onObjectsRelease();
	});
	
	dwgCanvas.on('object:selected', function(e){
		if(!dwgCanvas.isDrawingMode) onObjectSelected(e);
	});
	
	dwgCanvas.on('mouse:down', function(e){
		if(!dwgCanvas.isDrawingMode) checkSlidersClosed();
	});

	dwgCanvas.on('mouse:up', function(e){
		if(dwgCanvas.isDrawingMode){
			saveHistory(getCanvasImg());
		}
	});
	
	$('#font-color').on("input change", function(){
		var col = $('#font-color').val()
		setColour(col);
	});
	
	$('#stroke-color').on("input change", function(){
		var col = $('#stroke-color').val()
		setStrokeColour(col);
	});
	
	// default to center on init
	$('#text-center').css('background','white');
    $('#text-center').css('color','black');
	
	$('#drawing-line-width').on("input change", function(){
		dwgCanvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
		this.previousSibling.innerHTML = this.value;
	});
	
	$('#drawing-color').on("input change", function(){
		dwgCanvas.freeDrawingBrush.color = $('#drawing-color').val();
	});
	
	$('#lineheight').on("input change", function(){
		var h = parseInt(this.value, 10) || 1;
		this.previousSibling.innerHTML = this.value;
		setLineheight(h);
	});
	
	$('#strokewidth').on("input change", function(){
		var h = parseInt(this.value, 10) || 0;
		this.previousSibling.innerHTML = this.value;
		setStrokeWidth(h);
	});
	
	$('#fontsize').on("input change", function(){
		var h = parseInt(this.value, 10) || 0;
		this.previousSibling.innerHTML = this.value;
		setFontSize(h);
	});
}



function checkSlidersClosed()
{
	//debug("------   checkSlidersClosed > curOpenPop " + curOpenPop.attr('id'));
	//debug("------   checkSlidersClosed > designMode " + designMode);
	
	$('.desObjectsWrapper').hide();
	
	if(designMode == "draw" && sizePickerShowing) toggleSizePicker();
	if(designMode == "text"){
		if(strokeWidthPickerShowing) toggleStrokeWidthPicker();
		if(fontPickerShowing) toggleFontPicker();
		if(lineHeightPickerShowing) toggleLineHeightPicker();
		if(fontSizePickerShowing) togglefontSizePicker();
	}
}


function setDefaultDrawing()
{
	// reset object counter
	objectCounter = 0;
	
	// set to default
	textVals = textValsDefault;
	
	if(lastFontDiv) $("." + lastFontDiv).css('background','white');
	$(".fnt_sharkparty").css('background','#db0f0f');
	
	curObject = null;
	curObjectType = null;
	objsOpen = null;
	objectSelected = false;
	isDrawingMode = false;
	dwgCanvas.isDrawingMode = false;
	desObjMenuOpen = false;
	disableEditBtns();
	closeDesMenuBtns();
	$('#desObjs').html("");
	
	
	$('#text-bold').css('background','#BCC4C4');
	$('#text-bold').css('color','#8c1807');
	$('#text-italic').css('background','#BCC4C4');
	$('#text-italic').css('color','#8c1807');
	$('#text-underline').css('background','#BCC4C4');
	$('#text-underline').css('color','#8c1807');
	alignText("center");
};


