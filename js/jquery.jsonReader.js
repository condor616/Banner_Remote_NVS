// --------------------- Global Variables -------------------------------
	
	//for test purpose
	var _numberOfEntries;

	//var _jsonData; //it contains the JSON object
	var _jsonData; //it contains the JSON object

	/*
	The _scenes array contains objects as elements. 
	Each object contains the associated "entry".
	Once the entire JSON file get loaded, we call the method createScenes() that will go through the JSON file extracting all the single scenes assigning 
	every scene to an object within the array.
	*/
	var _jsonScenes = new Array(); 
	
//-------------------------END Global Variables ---------------------------------------


(function($){
	
	// --------------- Methods -------------------------------------
	var methods = {
		
		//init
		init: function(settings){
			
			_defaultSettings = {
				feed: "/js/data.json"
			}
			
			//overwrite the default values with the variables
			if (settings) $.extend(_defaultSettings, settings);	
			
			methods.loadData(_defaultSettings.feed);
		},
		
		
		//loaddata
		loadData: function(feed){	
			$.ajax({
				type: 'GET',
				url: feed,
				crossDomain: true,
				cache: false,
				dataType: 'json',
				success: function(data){
					methods.render(data);
				}
				,
				error: function(xhr, ajaxOptions, thrownError){	
					alert(xhr.status);
					alert(thrownError);
				
				}
			});
		},
		
		
		//render
		render: function(data){
			_jsonData = data;
			_numberOfEntries = _jsonData.Entries.length;
			alert('There are ' + _numberOfEntries + ' entries' );
			methods.createScenes();
			
			alert("JSON Loaded successfully");
		},
		
		createScenes: function(){
			
			//cycling through the main JSON file and recognizing each single entry
			for (var i=0; i<_jsonData.Entries.length; i++){
				_jsonScenes.push(_jsonData.Entries[i]);
			}
		},
		
		/*
		The following method is responsible to draw a scene. The number of the scene is passed as parameter.
		*/
		draw: function(sceneNumber){
			
		}
			
	};
	// ------------------- END Methods -------------------------------
	
	
	
		
	
	$.fn.jsonReader = function(method){
		
		if (typeof method == "object" || ! method){
			return methods.init.apply(this,arguments);
		}else{
			$.error(' Method ' + method + ' doesn\'t exist on Jquery.jsonreader');
		}
	}
	
	
})( jQuery );