
var drawingHistoryValues = [];
var	historyPosition = 0;




function resetHistory()
{
	debug("resetHistory" );
	
	drawingHistoryValues = [];
	historyPosition = 0;
	updateBtns();
}

function updateBtns()
{
   
    if(historyPosition >= 1){
        $('#drawing-undo').css('opacity',1);
    }else{
        $('#drawing-undo').css('opacity',0.2);
    }
	
	if(historyPosition > 1 && historyPosition < drawingHistoryValues.length){
        $('#drawing-redo').css('opacity',1);
    }else{
        $('#drawing-redo').css('opacity',0.2);
    }
}

// called on HTML page
function saveHistory(data)
{
	
	while (drawingHistoryValues.length > 30) {
		drawingHistoryValues.shift();
		historyPosition--;
	}
	if (historyPosition !== 0 && historyPosition < drawingHistoryValues.length) {
		drawingHistoryValues = drawingHistoryValues.slice(0, historyPosition);
		historyPosition++;
	} else {
		historyPosition = drawingHistoryValues.length+1;
	}
	
	$('#edit-clear').css('opacity',1);
	
	drawingHistoryValues.push(data);
	updateBtns();
	
}

function goThroughHistory(goForth, obj) 
{
	
	if ((goForth && historyPosition == drawingHistoryValues.length) || (!goForth && historyPosition == 1)) return;
	
	var pos = goForth ? historyPosition+1 : historyPosition-1;
	
	if (drawingHistoryValues.length && drawingHistoryValues[pos-1] !== undefined) {
		historyPosition = pos;
		setCanvasImg(drawingHistoryValues[pos-1], obj);
	}
	updateBtns();
}


function setCanvasImg(src, obj)
{
	debug("=====   setCanvasImg " + obj);

	var img = new Image();
	img.onload = function() {

        var imgbase64 = new fabric.Image(img);
		obj.clear();
		obj.add(imgbase64);
        obj.renderAll();
	};
	img.src = src;
}

