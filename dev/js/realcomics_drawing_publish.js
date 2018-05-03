
//var publishSettings = {arEnabled:true};

var saveInProgress = false;
var deleteOnPublish = false;





function showPublishScreen(num)
{
	//arel.Debug.log("showPublishScreen  > num " + num);
	
	selectedComicID = num;
	
	getComicInfo();
	
	//$(".frameColours").hide();
	
	
	deleteOnPublish = false;
	
	
	showScreen("publishScreen");
	
	getCurLocation(true); // __init
	
};



function initialiseSaveDesignMap(usePinLoc, zoom)
{
    
	if(zoom){
        // use current zoom
        map = new google.maps.Map(document.getElementById('mapView'), {
			zoom: zoom,
			streetViewControl: false,
			center: {lat: drawingLat, lng: drawingLon}
		});
    }else{
		map = new google.maps.Map(document.getElementById('mapView'), {
			zoom: 18,
			streetViewControl: false,
			center: {lat: drawingLat, lng: drawingLon}
		});
    }
	
    // zoom = 18
	
    var image = {
		url: 'imgs/map-person.png',
		size: new google.maps.Size(24, 64),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(12, 32)
	};
	
    // add map marker at users location
    var marker = new google.maps.Marker({
		position: new google.maps.LatLng(drawingLat, drawingLon),
		draggable: true,
        icon: image,
		map: map
	});
	
	google.maps.event.addListener(marker, 'drag', function() {});

	google.maps.event.addListener(marker, 'dragend', function() {
		var point = marker.getPosition();
		map.panTo(point);
        updateMarkerPosition(point);
	});
}


function updateMarkerPosition(latLng) {

	drawingLat = latLng.lat();
	drawingLon = latLng.lng();
	
	
	//arel.Debug.log("newLat " + drawingLat);
	//arel.Debug.log("newLng " + drawingLon);
	
    var zoom = map.getZoom();
    initialiseSaveDesignMap(true, zoom);
}



function getComicInfo()
{
	//arel.Debug.log("getComicInfo  " );
	
	if(newComic){
		var cID = newComicID;
	}else{
		var cID = selectedComicID;
	}
	
	var transaction = realTagrDB.transaction(["realTagrDB"], "readonly").objectStore("realTagrDB");
	var request = transaction.get(cID);
	
	request.onsuccess = function(event) {
		
		if(request.result) {
			
			var title = curComicTitle = request.result.comicName;
			$('#publishComicTitle').html("<p>" + title + "</p>");	

			isAREnabled = request.result.arEnabled;		// __frames var
			
			/* if(isAREnabled){
				$(".frameColours").show();
			}else{
				$(".frameColours").hide();
			} */
			
			// finish 
			//arel.Debug.log("getComicTitle  DONE ");
			
		} else {
			//arel.Debug.log(" couldn't be found in your database!");
		}
	};
	request.onerror = function(event) {
		//arel.Debug.log("Unable to retrieve data from database!");
	}; 
};


function cancelPublishing()
{
	$('#myComicsScreen').show();
	$('#publishScreen').hide();
	
	getMyComicsData();
};


function publishComic()
{
	arel.Debug.log("publishComic   " );
	
	showWebSpinner();
	
	// get the comic data associated with this ID
	var transaction = realTagrDB.transaction(["realTagrDB"]);
	var objectStore = transaction.objectStore("realTagrDB");
	var request = objectStore.get(selectedComicID);
	
	var cFrames = [];
	
	request.onsuccess = function(event) {
		
		if(request.result) {
			
			//arel.Debug.log("DB comicFrames: " + request.result.comicFrames.length );
			
			var userID = localStorage.realComicUserID;
			var comicTitle = request.result.comicName;
			var comicID = request.result.id;
			var arEnabled = (request.result.arEnabled == true) ? 1 : 0;
			
			if(request.result.comicFrames.length > 0){
				
				for(var i=0; i<request.result.comicFrames.length; i++){
					
					var fnum = request.result.comicFrames[i].frameNum;
					var track = request.result.comicFrames[i].frameTrigger;
					var des = request.result.comicFrames[i].frameDesign;
					var unq = request.result.comicFrames[i].isUnique;
					var tnum = request.result.comicFrames[i].trackableNum;
					
					var frameObj = {frameNum:fnum,frameTrigger:track,frameDesign:des,trackableNum:tnum,isUnique:unq};
					cFrames.push(frameObj);
				}
			}
			
			// all data collected - send to server
			publishComicSend(userID, comicTitle, cFrames, comicID, arEnabled);
			
		} else {
			//arel.Debug.log(" couldn't be found in your database!");
		}
	};
	request.onerror = function(event) {
		//arel.Debug.log("Unable to retrieve data from database!");
	};
};



function publishComicSend(userID, comicTitle, cFrames, comicID, arEn)
{
    arel.Debug.log("publishComicSend userid > [" + userID + "] title > [" + comicTitle + "] num frames > [" + cFrames.length + "]  comicID > [" + comicID + "]");
	
	//var arOn = publishSettings.arEnabled == true ? 1 : 0;
	
	var arOn = arEn;
	var fCol = "none"; 
	var lat = drawingLat;
	var lon = drawingLon;
	
	
	deleteOnPublish = $('#deleteComic').is(":checked");
	
	arel.Debug.log("drawingLat " + drawingLat);
	
	
	//arel.Debug.log("fCol " + fCol);
	
	// test connection 
	if(checkNetConnection()){
		
		if(saveInProgress) return;
		saveInProgress = true;
		
		showWebSpinner();
		
		$.ajax({
			type: "POST",
			url: serverPathURL + "publishtag.php",
			data: {
				'userID':userID,
				'tagTitle':comicTitle,
				'cFrames':cFrames,
				'tagID':comicID,
				'arEnabled':arOn,
				'frameCol':fCol,
				'lat':lat,
				'lon':lon
			},
			dataType: 'json',
			success: function(msg){
				arel.Debug.log("SAVED " + msg);
				comicPublished(msg);
			},
			error: function ( jqXhr, textStatus, errorThrown) { 
				arel.Debug.log("AJAX ERROR " + textStatus); 
				hideWebSpinner();
				saveInProgress = false;
			}
		});
	}else{
		//arel.Debug.log("showConnectionError !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		
		showConnectionError();
	}
};


function comicPublished(msg)
{
	arel.Debug.log("comicPublished " + msg + " selectedComicID " + selectedComicID);
	
	saveInProgress = false;
    hideWebSpinner();
	
	if(deleteOnPublish){
		deleteComicFromDB();
		
	}else{
		setComicPublished();
	}
	
	$('#myComicsScreen').show();
	$('#publishScreen').hide();
	
	getMyComicsData();
};


function setComicPublished()
{
	//arel.Debug.log("setComicPublished  " );
	
	if(newComic){
		var cID = newComicID;
	}else{
		var cID = selectedComicID;
	}
	
	
	var transaction = realTagrDB.transaction(["realTagrDB"], "readwrite").objectStore("realTagrDB");
	var request = transaction.get(cID);
	
	request.onsuccess = function(event) {
		
		if(request.result) {
			
			
			var item = event.target.result;
			item.comicState = "published";
				
			var req = transaction.put(item);
			req.onsuccess = function(ev){
				//arel.Debug.log('Successfully edited key');
            };
            req.onerror = function(ev){
               //arel.Debug.log('Error occured', ev.srcElement.error.message);
            };
			
			// finish 
			//arel.Debug.log("setComicPublished  DONE ");
			
		} else {
			//arel.Debug.log(" couldn't be found in your database!");
		}
	};
	request.onerror = function(event) {
		//arel.Debug.log("Unable to retrieve data from database!");
	};
};



