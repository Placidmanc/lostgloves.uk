var textVals = {"bold":false,"italic":false,"underline":false,"lineheight":1,"charSpacing":1,"fontsize":40,"colour":"#000","textalign":"center","family":"gagalin","strokeCol":"#fff","strokeWidth":0};
var textValsDefault = {"bold":false,"italic":false,"underline":false,"lineheight":1,"charSpacing":1,"fontsize":40,"colour":"#000","textalign":"center","family":"gagalin","strokeCol":"#fff","strokeWidth":0};

var lastFontDiv = "fnt_sharkparty";



function setColour(val)
{
	textVals.colour = val;
	if(curObjectType == "text" || curObjectType == "textbox"){
		curObject.set("fill", val);
		dwgCanvas.renderAll();
	}
};


function setStrokeColour(val)
{
	textVals.colour = val;
	if(curObjectType == "text" || curObjectType == "textbox"){
		if(textVals.strokeWidth > 0){
			curObject.set("stroke", val);
		}else{
			curObject.set("stroke", "");
		}
		dwgCanvas.renderAll();
	}
};


function setLineheight(h)
{
	textVals.lineheight = Number(h) * 0.25;
	if(curObjectType == "text" || curObjectType == "textbox"){
		curObject.set("lineHeight", h);
		dwgCanvas.renderAll();
	}
};


function setStrokeWidth(h)
{
	textVals.strokeWidth = h;
	if(h == 0){
		// clear stroke
		textVals.strokeWidth = 0;
	}
	if(curObjectType == "text" || curObjectType == "textbox"){
		if(h == 0){
			curObject.set("stroke", "");
		}else{
			curObject.set("stroke", textVals.strokeCol);
		}
		curObject.set("strokeWidth", h);
		dwgCanvas.renderAll();
	}
};


function setFontSize(h)
{
	textVals.fontsize = h;

	if(curObjectType == "text" || curObjectType == "textbox"){
		curObject.set("fontSize", h);
		dwgCanvas.renderAll();
	}
};



function selectFont(fnt, div)
{
	$("." + div).css('background','#db0f0f');
	if(lastFontDiv) $("." + lastFontDiv).css('background','white');
	lastFontDiv = div;
	
	textVals.family = String(fnt);
	if(curObjectType == "text" || curObjectType == "textbox"){
		curObject.set("fontFamily", String(fnt));
		dwgCanvas.renderAll();
	}
	$('#text-family').html("<p>" + fnt + "</p>");
	
	toggleFontPicker();
};


function textTools(act)
{
    //debug("textTools " + act);
	
	
	
    if(act == 'bold'){
       toggleBold();
	   
	   checkSlidersClosed();
	   
    }else if(act == 'italic'){
		toggleItalic();
		
		checkSlidersClosed();
		
    }else if(act == 'underline'){
		toggleUnderline();
		
		checkSlidersClosed();
		
    }else if(act == 'alignleft'){
		alignText("left");
		
		checkSlidersClosed();
		
    }else if(act == 'aligncentre'){
		alignText("center");
		
		checkSlidersClosed();
		
    }else if(act == 'alignright'){
		alignText("right");
		
		checkSlidersClosed();
    
    }else if(act == 'add'){
		addText();
		
		checkSlidersClosed();
		
    }else if(act == 'line'){
		toggleLineHeightPicker();
		
		if(strokeWidthPickerShowing) toggleStrokeWidthPicker();
		if(fontPickerShowing) toggleFontPicker();
		if(fontSizePickerShowing) togglefontSizePicker();
		
    }else if(act == 'fontfamily'){
		toggleFontPicker();
		
		if(strokeWidthPickerShowing) toggleStrokeWidthPicker();
		if(lineHeightPickerShowing) toggleLineHeightPicker();
		if(fontSizePickerShowing) togglefontSizePicker();
		
    }else if(act == 'strokew'){
		toggleStrokeWidthPicker();

		if(fontPickerShowing) toggleFontPicker();
		if(lineHeightPickerShowing) toggleLineHeightPicker();
		if(fontSizePickerShowing) togglefontSizePicker();
		
	}else if(act == 'deleteText'){
		$('#doodtext').val('');
		
		checkSlidersClosed();
		
	}else if(act == 'size'){
		togglefontSizePicker();
		
		if(strokeWidthPickerShowing) toggleStrokeWidthPicker();
		if(fontPickerShowing) toggleFontPicker();
		if(lineHeightPickerShowing) toggleLineHeightPicker();
	}
};


function toggleBold()
{
	
	if(textVals.bold){
		
		textVals.bold = false;
		$('#text-bold').css('background','#d63f2b');
        $('#text-bold').css('color','#fff');
		
		if(curObjectType == "text" || curObjectType == "textbox"){
			curObject.set("fontWeight", "100");
			dwgCanvas.renderAll();
		}
	}else{
		
		textVals.bold = true;
		$('#text-bold').css('background','white');
        $('#text-bold').css('color','black');
		
		if(curObjectType == "text" || curObjectType == "textbox"){
			curObject.set("fontWeight", "bold");
			dwgCanvas.renderAll();
		}
	}
};


function toggleItalic()
{
	
	if(textVals.italic){
		
		textVals.italic = false;
		$('#text-italic').css('background','#d63f2b');
        $('#text-italic').css('color','#fff');
		
		if(curObjectType == "text" || curObjectType == "textbox"){
			curObject.set("fontStyle", "normal");
			dwgCanvas.renderAll();
		}
	}else{
		
		textVals.italic = true;
		$('#text-italic').css('background','white');
        $('#text-italic').css('color','black');
		
		if(curObjectType == "text" || curObjectType == "textbox"){
			curObject.set("fontStyle", "italic");
			dwgCanvas.renderAll();
		}
	}
};


function toggleUnderline()
{
	
	if(textVals.underline){
		
		textVals.underline = false;
		$('#text-underline').css('background','#d63f2b');
        $('#text-underline').css('color','#fff');
		
		if(curObjectType == "text" || curObjectType == "textbox"){
			curObject.set("textDecoration", "");
			dwgCanvas.renderAll();
		}
	}else{
		
		textVals.underline = true;
		$('#text-underline').css('background','white');
        $('#text-underline').css('color','black');
		
		if(curObjectType == "text" || curObjectType == "textbox"){
			curObject.set("textDecoration", "underline");
			dwgCanvas.renderAll();
		}
	}
};


function alignText(a)
{
	textVals.textalign = a;
	
	if(curObjectType == "text" || curObjectType == "textbox"){
		curObject.set("textAlign", a);
		dwgCanvas.renderAll();
	}
	
	if(a == "left"){

		$('#text-left').css('background','white');
        $('#text-left').css('color','black');
		
		$('#text-center').css('background','#d63f2b');
        $('#text-center').css('color','#fff');
		
		$('#text-right').css('background','#d63f2b');
        $('#text-right').css('color','#fff');
		
	}else if(a == "center"){
		
		$('#text-left').css('background','#d63f2b');
        $('#text-left').css('color','#fff');
		
		$('#text-center').css('background','white');
        $('#text-center').css('color','black');
		
		$('#text-right').css('background','#d63f2b');
        $('#text-right').css('color','#fff');
		
	}else if(a == "right"){
		
		$('#text-left').css('background','#d63f2b');
        $('#text-left').css('color','#fff');
		
		$('#text-center').css('background','#d63f2b');
        $('#text-center').css('color','#fff');
		
		$('#text-right').css('background','white');
        $('#text-right').css('color','black');
	}
};


function togglefontSizePicker()
{
	
	// toggle font size selector
	if(fontSizePickerShowing){
		
		$('#fontsize-container').velocity("fadeOut", {duration: screenFade });
		fontSizePickerShowing = false;
		$('#text-size').css('background','#d63f2b');
        $('#text-size').css('color','#fff');
		
	}else{
		$('#fontsize-container').velocity("fadeIn", {duration: screenFade });
		fontSizePickerShowing = true;
		$('#text-size').css('background','white');
        $('#text-size').css('color','black');
	}
};




function toggleFontPicker()
{

	// toggle line height selector
	if(fontPickerShowing){
		
		$('#font-picker').velocity("fadeOut", {duration: screenFade });
		fontPickerShowing = false;
		$('#text-family').css('background','#d63f2b');
        $('#text-family').css('color','#fff');
		
	}else{
		$('#font-picker').velocity("fadeIn", {duration: screenFade });
		fontPickerShowing = true;
		$('#text-family').css('background','white');
        $('#text-family').css('color','black');
	}
};


function toggleLineHeightPicker()
{
	//debug("toggleLineHeightPicker > lineHeightPickerShowing = " + lineHeightPickerShowing + " curOpenPop = " + curOpenPop);
	
	// toggle line height selector
	if(lineHeightPickerShowing){
		
		$('#lineheight-container').velocity("fadeOut", {duration: screenFade });
		lineHeightPickerShowing = false;
		$('#text-height').css('background','#d63f2b');
        $('#text-height').css('color','#fff');
		
	}else{
		$('#lineheight-container').velocity("fadeIn", {duration: screenFade });
		lineHeightPickerShowing = true;
		$('#text-height').css('background','white');
        $('#text-height').css('color','black');
	}
};


function toggleStrokeWidthPicker()
{
	//debug("toggleStrokeWidthPicker > strokeWidthPickerShowing = " + strokeWidthPickerShowing + " curOpenPop = " + curOpenPop);
	
	// toggle line height selector
	if(strokeWidthPickerShowing){
		
		$('#strokewidth-container').velocity("fadeOut", {duration: screenFade });
		strokeWidthPickerShowing = false;

		$('#text-stroke').css('background','#d63f2b');
        $('#text-stroke').css('color','#fff');
		
	}else{
		$('#strokewidth-container').velocity("fadeIn", {duration: screenFade });
		strokeWidthPickerShowing = true;
		$('#text-stroke').css('background','white');
        $('#text-stroke').css('color','black');
	}	 
};


function addText()
{
	
    var str = document.getElementById('doodtext').value;
    
	// only add text if entered into textbox TODO add message to enter text?
	if(str.length > 0){
    
		var fw = textVals.bold ? "bold" : "normal";
		var fs = textVals.italic ? "italic" : "normal";
		var ul = textVals.underline ? "underline" : "";
		
		var scale = 0.5;
		var pos = 750/2;
		
		if (/\s/.test(str)){
			debug("has spaces");
		
			var doodleText = new fabric.Textbox(str, {
				fontFamily: textVals.family,
				fontSize: textVals.fontsize,
				lineHeight: textVals.lineheight,
				textDecoration: ul,
				fontWeight: fw,
				fontStyle: fs,
				stroke: textVals.strokeCol,
				strokeWidth: textVals.strokeWidth,
				textAlign: textVals.textalign,
				fill: textVals.colour,
				hasControls: true,
				hasRotatingPoint: false,
				hasBorders: true,
				cornerSize: 22,
				borderColor:'rgba(0,0,0,0.6)',
				cornerColor :'rgba(0,0,0,0.6)',
				padding:15, 
				transparentCorners:false,
				originX: 'center',
				originY: 'center',
				top:pos,
				left:pos
			});
			
		}else{
			
			var doodleText = new fabric.Text(str, {
				fontFamily: textVals.family,
				fontSize: textVals.fontsize,
				lineHeight: textVals.lineheight,
				textDecoration: ul,
				fontWeight: fw,
				fontStyle: fs,
				stroke: textVals.strokeCol,
				strokeWidth: textVals.strokeWidth,
				textAlign: textVals.textalign,
				fill: textVals.colour,
				hasControls: true,
				hasRotatingPoint: true,
				hasBorders: true,
				cornerSize: 22,
				borderColor:'rgba(0,0,0,0.6)',
				cornerColor :'rgba(0,0,0,0.6)', 
				minScaleLimit:0.02,
				padding:15, 
				transparentCorners:false,
				originX: 'center',
				originY: 'center',
				scaleX:scale,
				scaleY:scale,
				top:pos,
				left:pos
			});
		}
		
		// add text to canvas
		dwgCanvas.add(doodleText);
		
		// select last item added
		var selected = dwgCanvas.setActiveObject(dwgCanvas.item(dwgCanvas.getObjects().length - 1));

		// keep track of number of items added
		objectCounter++;
		
		resetHistory();
		
	}
};




