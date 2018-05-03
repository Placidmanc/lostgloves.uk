
var indexedDB, IDBTransaction, IDBKeyRange, realTagrDB, newComicArrPos;

var newComic = false;

	


// initialise DB - called from __drawing
function initDB()
{
	
	//debug("indexedDB initDB() >>> ");
	
	indexedDB = window.indexedDB || window.webkitIndexedDB;
	IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
	IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
	
	if (!window.indexedDB) {
		debug("Your browser doesn't support a stable version of IndexedDB.");
	}
	
	if (IDBTransaction){
		IDBTransaction.READ_WRITE = IDBTransaction.READ_WRITE || 'readwrite';
		IDBTransaction.READ_ONLY = IDBTransaction.READ_ONLY || 'readonly';
	}
	
	
	/*  quick method to drop table */
	var dropDatabase = function(name){
		var request = indexedDB.deleteDatabase(name);
		request.onsuccess = function() { //debug("indexedDB drop good"); 
		};
		request.onerror = function() { //debug("indexedDB drop failed"); 
		};
	};
	//dropDatabase("realTagrDB");
	
	
	
	var request = indexedDB.open("realTagrDB",1);
	request.onupgradeneeded = function(e){
		
		//debug("indexedDB onupgradeneeded");
		var idb = e.target.result;
		if (!idb.objectStoreNames.contains('realTagrDB')){
			var objStore = idb.createObjectStore('realTagrDB',{ keyPath: 'id', autoIncrement:true });
		}
	};
	request.onsuccess = function(e) {  
	
		//debug("indexedDB onsuccess ");
		
		// store ref to DB
		realTagrDB = e.target.result;
		
		// call funtion to display mycomics or newdrawing 
		dataLoaded();
		
	};
	request.onerror = function(e) { 
		// handle error 
		//debug("indexedDB onerror " + e.target.errorCode);
	};
}



function dataLoaded()
{
	if(userMode == 'mycomics'){
		getMyComicsData(); 			// __mycomics
    }else{
		getAllComics();
    }
}


function getAllComics() 
{
	
	comicArr = [];
	
	var transaction = realTagrDB.transaction(["realTagrDB"],"readonly").objectStore("realTagrDB");
	
	var count = transaction.count();
	count.onsuccess = function() {
		if(count.result < 1){
			return;
		}
	}
	
	var req = transaction.openCursor();
	
	req.onsuccess = function(event) {
		
		var cursor = event.target.result;
		if (cursor) {
			
			var title = cursor.value.comicName;
			var state = cursor.value.comicState;
			var comicID = cursor.value.id;
			var arEn = cursor.value.arEnabled;
			
			// store basic comic info
			var framesArr = [];
			var comicObj = {comicID:comicID,comicName:title,comicFrames:framesArr,comicState:state,arEnabled:arEn};
			comicArr.push(comicObj);
			
			cursor.continue();
			
			
		}else{
			
			// done
			userComicsCount = comicArr.length;
			
			//debug("readAll COMPLETE  userComicsCount > " + userComicsCount );
		}
	}; 
	req.onerror = function (e) {
		//debug("Error Getting: ", e);
	}; 
};





/* NEW COMIC */

// called from comicStartScreen after entering comic title
function createComic()
{
	debug("createComic  " + comicArr.length);
	
	document.activeElement.blur();
	
	if(comicArr.length < maxComics){
	
		var comicTitle = !$('#comicname').val() ? "Untitled..." : $('#comicname').val();
		
		//debug("...... comicTitle  " + comicTitle);
		//debug("...... comicArr.length  " + comicArr.length);
		
		isAREnabled = $('#ar-enableder').is(":checked");
		
		//debug("...... arEnabled  " + isAREnabled);
		
		// hide add new button if AR enabled
		/* if(isAREnabled){
			$('#addnewbtn').css('opacity',.2);
		}else{
			$('#addnewbtn').css('opacity',1);
		} */
		
		// create new empty array for comic frames
		var framesArr = [];
		var comicObj = {comicID:null,comicName:comicTitle,comicFrames:framesArr,comicState:'unpublished',arEnabled:isAREnabled};
		comicArr.push(comicObj);
		
		newComic = true;
		newComicArrPos = comicArr.length-1;
		
		//debug("...... comicName  " + comicArr[newComicArrPos].comicName);
		//debug("...... newComicArrPos  " + newComicArrPos);
		
		// save comic 
		addComicToDB();
		
		// set defaults
		$('#comicname').val("");
		//$('#ar-enabled').prop('checked', true);
		$('#captureDrag').hide();
		$('#camera').show();
		$('#cameraTitle').show();
		
		// show capture screen
		showScreen("captureScreen");
		
	}else{
		// show maximum comics created message
		$('#maxComicsPopupscreen').show();
		maxPopShowing = true;
	}
};


function addComicToDB() {
	
	//debug("indexedDB addComicToDB >>> " + newComicArrPos);
	
	var arr = comicArr[newComicArrPos];
	
	var request = realTagrDB.transaction(["realTagrDB"], "readwrite").objectStore("realTagrDB").add(arr);
	
	request.onsuccess = function(event) {
		//debug("added comic to your database.");
	};
	request.onerror = function(event) {
		//debug("Unable to add comic to your database! ");
	}
};


