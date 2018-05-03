
var ca, ey, st, mo, spinner;

var startTime = 0;	// test script speed



var debuggger = 1;




function debug(str)
{
	if(debuggger) console.log(str);
}




/* create HTML for object picker lists and store in memory */
function createDrawingLists()
{
    
    // stickers
    str = "<div>";
    for(var i=1; i<=65; i++){
    
        if(i<10){
            var count = "0" + i;
        }else{
            var count = i;
        }
        
        var obj = "stickers_" + count;
        str += "<div class='desObjPicker' onclick='selectDesignObj(\"stickers/png/" + obj + "\")'><img class='desObjImg' src='resources/stickers/jpg/" + obj + ".jpg' /></div>"
    }
    str += "</div>";
    st = str;
    
    
    // captions
    str = "<div>";
    for(var i=1; i<=117; i++){
    
        if(i<10){
            var count = "00" + i;
        }else if(i<100 && i>=10){
            var count = "0" + i;
        }else{
            var count = i;
        }
        
        var obj = "cap_" + count;
        str += "<div class='desObjPicker' onclick='selectDesignObj(\"captions/png/" + obj + "\")'><img class='desObjImg' src='resources/captions/jpg/" + obj + ".jpg' /></div>"
    }
    str += "</div>";
    ca = str;
    
    
    // eyes
    str = "<div>";
    for(var i=1; i<=76; i++){
    
        if(i<10){
            var count = "0" + i;
        }else{
            var count = i;
        }
        
        var obj = "eyes_" + count;
        str += "<div class='desObjPicker' onclick='selectDesignObj(\"eyes/png/" + obj + "\")'><img class='desObjImg' src='resources/eyes/jpg/" + obj + ".jpg' /></div>"
    }
    str += "</div>";
    ey = str;
	
	
	// mouths
    str = "<div>";
    for(var i=1; i<=89; i++){
    
        if(i<10){
            var count = "0" + i;
        }else{
            var count = i;
        }
        
        var obj = "mouth_" + count;
        str += "<div class='desObjPicker' onclick='selectDesignObj(\"mouths/png/" + obj + "\")'><img class='desObjImg' src='resources/mouths/jpg/" + obj + ".jpg' /></div>"
    }
    str += "</div>";
    mo = str;

};


function showWebSpinner()
{
	//arel.Debug.log("showWebSpinner ");
	
	/* var d = new Date();
	startTime = d.getTime(); */
	
	$('#webspinner').show();
	var target = document.getElementById('webspinner');
	spinner.spin(target);
};


function hideWebSpinner()
{
	$('#webspinner').hide();
	spinner.stop();
	
	/* var d = new Date();
	var endtime = d.getTime();
	
	var runTime = endtime - startTime;
	arel.Debug.log("runTime ==== " + runTime); */
};


function checkNetConnection()
{
	
	//arel.Debug.log("checkNetConnection ");
	
	jQuery.ajaxSetup({async:false});
	var re = "";
	var r = Math.round(Math.random() * 10000);
	$.get(serverPathURL + "testdot.png",{subins:r},function(d){
		re=true;
	}).error(function(){
		re=false;
	});
	return re;
}


function showConnectionError()
{
	//arel.Debug.log("showConnectionError ");
	
	errorPopShowing = true;
	hideWebSpinner();
	
    $('#errorPopupscreen').velocity("fadeIn", {duration: screenFade });
};


function closePopup()
{
	if(maxPopShowing){
		maxPopShowing = false;
		$('#maxComicsPopupscreen').velocity("fadeOut", {duration: screenFade });
	}
	if(deletePopShowing){
		deletePopShowing = false;
		$('#deleteComicPopupscreen').velocity("fadeOut", {duration: screenFade });
	}
	if(errorPopShowing){
		errorPopShowing = false;
		$('#errorPopupscreen').velocity("fadeOut", {duration: screenFade });
	}
};


















